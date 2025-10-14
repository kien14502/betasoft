'use client';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { usePostAuthFileUpload } from '@/app/api/files/files';
import { showToast } from '@/utils/toast';

interface UploadImageProps {
  value?: UploadFile[];
  maxImageUpload?: number;
  onChange?: (fileList: UploadFile[]) => void;
  aspect?: number;
  width?: number;
  height?: number;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function UploadImage({
  value = [],
  onChange,
  maxImageUpload = 1,
  width,
  height,
  aspect = 1,
}: UploadImageProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(value);

  const { mutateAsync: uploadFile } = usePostAuthFileUpload();
  useEffect(() => {
    const isEqual =
      value.length === fileList.length && value.every((v, i) => v.url === fileList[i].url);

    if (!isEqual) {
      setFileList(value);
    }
  }, [value]);

  // @ts-ignore
  const handleCustomRequest = (options: any) => {
    const { file, onSuccess, onError } = options;

    uploadFile({ data: { file } })
      .then((res) => {
        onSuccess?.(res.data?.url);
      })
      .catch((err) => {
        onError?.(err);
        showToast(err.message, 'error');
      });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange?.(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none', width: width, height: height }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div style={{ width: width, height: height }}>
      <ImgCrop rotationSlider aspect={aspect} showReset modalProps={{ destroyOnHidden: true }}>
        <Upload
          customRequest={handleCustomRequest}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          style={{ width: width, height: height }}
          itemRender={(originNode) => <div style={{ width, height }}>{originNode}</div>}
        >
          {fileList.length >= maxImageUpload ? null : uploadButton}
        </Upload>
      </ImgCrop>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
          alt=""
        />
      )}
    </div>
  );
}

export function normalizeImage(urls: string[] = []): UploadFile[] {
  return urls.map((url, index) => ({
    uid: String(index),
    name: url.split('/').pop() || `img-${index}`,
    status: 'done',
    url,
  }));
}
