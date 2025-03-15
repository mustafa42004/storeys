import { useEffect } from "react";
import { useState } from "react";
import PreviewContentModal from "./PreviewContentModal";

const Content = ({ fetchContent, savedContent }) => {
  const [content, setContent] = useState([""]);
  const [initialLoad, setInitialLoad] = useState(true);

  // Only load savedContent initially, not on every savedContent change
  useEffect(() => {
    if (savedContent) {
      // Ensure no null values in the array
      const validContent = savedContent.map((item) =>
        item === null ? "" : item
      );

      if (
        initialLoad ||
        JSON.stringify(validContent) !== JSON.stringify(content)
      ) {
        setContent(validContent);
        setInitialLoad(false);
      }
    }
  }, [savedContent, content, initialLoad]);

  // Add new content
  const addContent = () => {
    const newContent = [...content, ""];
    setContent(newContent);
    fetchContent(newContent);
  };

  // Update a specific content field
  const updateContent = (index, value) => {
    const updatedContent = [...content];
    updatedContent[index] = value || ""; // Ensure value is never null
    setContent(updatedContent);
    fetchContent(updatedContent);
  };

  // Remove specific content
  const removeContent = (index) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
    fetchContent(updatedContent);
  };

  return (
    <>
      <div className="card my-3">
        <div className="card-header pt-4 pb-2">
          <div className="flex-cs header">
            <h6>
              Add Description
              <span data-tooltip="Preview">
                <button
                  className="cs-btn"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-content"
                >
                  <i
                    className="fa-regular fa-lg fa-circle-info"
                    style={{ color: "#aaa" }}
                  />
                </button>
              </span>
            </h6>
          </div>
        </div>
        <div className="card-body py-2">
          <div className="projects-content">
            {content?.map((value, index) => (
              <div key={index}>
                {index !== 0 && <div className="divider"></div>}
                <div className="layout">
                  <div className="mb-2 w-100 flex-cs header">
                    <h5 className="m-0">
                      {index !== 0 ? `Content ${index}` : `Heading`}
                    </h5>
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => removeContent(index)}
                        className="btn bg-gradient-danger m-0"
                      >
                        remove
                      </button>
                    )}
                  </div>
                  <div className="my-3">
                    {index === 0 ? (
                      <input
                        type="text"
                        value={value || ""}
                        onChange={(e) => updateContent(index, e.target.value)}
                        className="form-control"
                        placeholder="Enter Title"
                      />
                    ) : (
                      <textarea
                        type="text"
                        value={value || ""}
                        onChange={(e) => updateContent(index, e.target.value)}
                        className="form-control"
                        rows={5}
                        placeholder="Enter Content"
                      ></textarea>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addContent}
              className="btn m-0 bg-gradient-success"
            >
              <i className="fa-solid fa-plus" /> &nbsp; Add More
            </button>
          </div>
        </div>
      </div>
      <PreviewContentModal img={"/assets/img/content.JPG"} />
    </>
  );
};

export default Content;
