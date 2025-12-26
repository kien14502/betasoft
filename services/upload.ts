import { axios } from '@/config/axios';
import { ResponseSuccess } from '@/interface/common';
import { UploadedImage } from '@/interface/file';
import { useMutation } from '@tanstack/react-query';

export const uploadFile = async (file: Blob): Promise<ResponseSuccess<UploadedImage>> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post('/auth/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};
