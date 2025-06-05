const [previews, setPreviews] = useState([]);
const [images, setImages] = useState([]);

const handleImageChange = (event) => {
  const files = Array.from(event.target.files);

  const validFiles = files.filter(file => {
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return false;
    }
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return false;
    }
    return true;
  });

  const newPreviews = validFiles.map(file => URL.createObjectURL(file));

  setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  setImages((prevImages) => [...prevImages, ...validFiles]);
};


images.forEach(image => {
  formData.append("images[]", image);
});


useEffect(() => {
  return () => {
    if (preview) {
      preview.forEach(url => URL.revokeObjectURL(url));
    }
  };
}, [preview]);



const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "status") {
    setSubCategoryData({ ...subCategoryData, [name]: value === "1" ? 1 : 0 });
  } else {
    setSubCategoryData({ ...subCategoryData, [name]: value });
  }
};