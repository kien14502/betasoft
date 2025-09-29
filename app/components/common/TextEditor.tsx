import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios"; // Để upload ảnh

interface TextEditorProps {
  width?: string;
  height?: string;
}

const TextEditor = ({ width, height }: TextEditorProps) => {
  const [value, setValue] = useState("");

  // Sử dụng useRef để tham chiếu đến Quill instance
  const quillRef = useRef<ReactQuill>(null);

  const handleImageUpload = (file: File) => {
    // Tạo một formData để gửi ảnh
    const formData = new FormData();
    formData.append("file", file);

    // Thực hiện upload ảnh lên server
    axios
      .post("/upload", formData)
      .then((response) => {
        // Lấy URL ảnh từ response của server
        const imageUrl = response.data.url;

        // Kiểm tra quillRef.current trước khi gọi getEditor()
        if (quillRef.current) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          // Kiểm tra xem range có phải là null không trước khi sử dụng
          if (range) {
            quill.insertEmbed(range.index, "image", imageUrl);
          } else {
            console.error("Không có đoạn văn bản nào được chọn!");
          }
        }
      })
      .catch((error) => {
        console.error("Upload ảnh thất bại", error);
      });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image"], // Thêm nút image vào toolbar
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      ["clean"], // Nút xóa nội dung
    ],
  };

  // Thiết lập một listener cho nút upload ảnh
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const toolbar = quill.getModule("toolbar") as any;

      // Tạo một custom handler cho nút image
      toolbar.addHandler("image", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.click();

        fileInput.onchange = () => {
          const file = fileInput.files?.[0];
          if (file) {
            handleImageUpload(file);
          }
        };
      });
    }
  }, []);

  return (
    <ReactQuill
      ref={quillRef} // Gán quillRef vào component
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      style={{ height: height, width: width }}
    />
  );
};

export default TextEditor;
