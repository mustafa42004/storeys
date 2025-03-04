import React, { useState } from 'react';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill theme
import axios from 'axios';

const CreateCommunity = () => {
  const [bannerPreview, setBannerPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      permalink: '',
      status: '',
      banner: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('permalink', values.permalink);
      formData.append('content', values.content);
      formData.append('status', values.status);
      if (values.banner) {
        formData.append('banner', values.banner);
      }

      try {
        const response = await axios.post('/api/community', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Community created:', response.data);
      } catch (error) {
        console.error('Error creating community:', error);
      }
    },
  });

  const handleContentChange = (content) => {
    formik.setFieldValue('content', content);
  };

  const handleBannerChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      formik.setFieldValue('banner', file);

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please select a JPG or JPEG image.');
    }
  };

    const permalinkFormat = (event) => {
        const title = event.target.value;
        const permalink = title
            .toLowerCase()             
            .replace(/\s+/g, "-");     

        formik.setFieldValue('permalink', permalink);
    };


    const setTitlePermalink = (event) => {
        const title = event.target.value;
        const permalink = title
            .toLowerCase()            
            .split(" ")              
            .filter(word => word)    
            .join("-");  
        formik.setFieldValue('title', title);
        formik.setFieldValue('permalink', permalink);
    };

  return (      
    <form onSubmit={formik.handleSubmit}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="flex-cs justify-content-between">
              <h4>Create Community</h4>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>

            <div className="card my-3">
              <div className="card-header">
                <h5>Community Details</h5>
              </div>
              <div className="card-body">
                <div className="flex-cs align-items-center">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={(event)=>setTitlePermalink(event)}
                    className="form-control my-2 me-2"
                  />
                  <input 
                    type="text"
                    name="permalink"
                    placeholder="Permalink"
                    value={formik.values.permalink}
                    onChange={(event)=> permalinkFormat(event)}
                    className="form-control my-2 me-2"
                  />
                  <select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    className="form-control my-2"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <input
                  type="file"
                  name="banner"
                  accept=".jpg,.jpeg"
                  onChange={handleBannerChange}
                  className="form-control my-2"
                />
                {bannerPreview && <img src={bannerPreview} alt="Banner Preview" style={{ height: '300px', width: '300px', objectFit: 'cover', marginTop: '10px' }} />}
              </div>
            </div>

            <div className="card my-3">
              <div className="card-body">
                <div className="blog-editor p-0 m-0">
                  <ReactQuill
                    value={formik.values.content}
                    onChange={handleContentChange}
                    placeholder="Write your community description here..."
                    modules={modules}
                    formats={formats}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
  'strike', 'blockquote', 'code-block', 'color', 'background',
  'align', 'link', 'image', 'video',
];

export default CreateCommunity;