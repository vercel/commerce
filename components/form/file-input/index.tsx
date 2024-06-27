'use client';

import { PhotoIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import { File as ShopifyFile } from 'lib/shopify/types';
import { ChangeEvent, useEffect, useId, useState, useTransition } from 'react';
import { getFileDetails } from './actions';

type FileInputProps = {
  name: string;
  label: string;
  fileId?: string | null;
};

const FileInput = ({ name, label, fileId }: FileInputProps) => {
  const id = useId();
  const [file, setFile] = useState<File | undefined>();
  const [defaultFileDetails, setDefaultFileDetails] = useState<ShopifyFile | undefined>();

  const [loading, startTransition] = useTransition();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!fileId) return;

    startTransition(async () => {
      const fileResponse = await getFileDetails(fileId);
      setDefaultFileDetails(fileResponse);
    });
  }, [fileId]);

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          <div className="mt-2 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/70 focus-within:ring-offset-2"
            >
              <span>Upload a file</span>
              <input id={id} name={name} type="file" className="sr-only" onChange={onFileChange} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        {loading ? <LoadingDots className="bg-dark" /> : file?.name || defaultFileDetails?.alt}
      </p>
    </div>
  );
};

export default FileInput;
