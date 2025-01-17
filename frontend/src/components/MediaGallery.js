import "../css/MediaGallery.css"

const MediaGallery = ({ media }) => {
  if (!Array.isArray(media) || media.length === 0) {
    return <p className="text-gray-600">No media uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {media.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg"
        >
          {item.url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-48 object-cover rounded"
            />
          ) : item.url.match(/\.(mp4)$/i) ? (
            <video
              src={item.url}
              controls
              className="w-full h-48 object-cover rounded"
            />
          ) : item.url.match(/\.(pdf)$/i) ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View PDF: {item.name}
            </a>
          ) : item.url.match(/\.(docx)$/i) ? (
            <a
              href={item.url}
              download
              className="text-green-500 underline"
            >
              Download DOCX: {item.name}
            </a>
          ) : (
            <p className="text-red-500">Unsupported file type: {item.name}</p>
          )}
        </div>
      ))}
    </div>
  );
};


export default MediaGallery;
