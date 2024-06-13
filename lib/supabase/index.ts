const uploadFile = async (req: Request, res: Response) => {
  const { file } = req.files as { file: UploadedFile[] };
  const { name, type, size } = file;

  if (size > 1000000) {
    return res.status(400).json({ message: 'File size must be less than 1MB' });
  }

  const uploadPath = path.join(__dirname, 'uploads', name);

  try {
    await file.mv(uploadPath);
    res.json({ message: 'File uploaded' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

export default uploadFile;
