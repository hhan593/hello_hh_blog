import { useState, useEffect } from "react";

const ImageUploader = ({
  value = null,
  onChange,
  isUploading = false,
  error = "",
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (value) {
      const previewUrl = URL.createObjectURL(value);
      setImagePreview(previewUrl);
    }
  }, [value]);
  useEffect(() => {
    return () => {
      
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, []); // 空依赖：仅在卸载时执行
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSizeMB = 5;

    if (!validTypes.includes(file.type)) {
      alert("仅支持JPG/PNG/WEBP格式");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`文件大小不能超过${maxSizeMB}MB`);
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 文件选择器 */}
      <label
        className="w-max p-2 shadow-md text-sm bg-white text-gray-500 rounded-xl cursor-pointer"
      >
        {value ? "更换图片" : "添加封面图"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
          disabled={isUploading}
        />
      </label>

      {/* 预览区域 */}
      {imagePreview && (
        <div className="relative group">
          <img
            src={imagePreview}
            alt="封面预览"
            className="w-full max-h-100 object-contain rounded-lg border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            disabled={isUploading}
          >
            ✕
          </button>
        </div>
      )}

      {/* 状态反馈 */}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {isUploading && (
        <div className="text-gray-500 text-sm">图片上传中...</div>
      )}
    </div>
  );
};

export default ImageUploader;
