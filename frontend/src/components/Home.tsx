import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {ToastContainer, toast} from 'react-toastify';
import shortid from 'shortid';

type fileType = {
    id: string;
    filename: string;
    filetype: string;
    fileimage: any;
    b_fileImage: any;
    datetime: string;
    filesize: string;
    f_file: any;
}
export default function Home() {
    const [selectedfile, SetSelectedFile] = useState<fileType | null>();
    const [Files, SetFiles] = useState([]);


    const filesizes = (bytes: any, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const InputChange = (e: any) => {
        // --For Single File Input
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = (ev) => {
            console.log("Here");
            SetSelectedFile({
                id: shortid.generate(),
                filename: e.target.files[0].name,
                filetype: e.target.files[0].type,
                fileimage: reader.result,
                b_fileImage: ev?.target?.result,
                datetime: e.target.files[0].lastModifiedDate.toLocaleString('en-IN'),
                filesize: filesizes(e.target.files[0].size),
                f_file: file
            });
        }
        if (e.target.files[0]) {
            console.log("Before Selected Files: ", e.target.files[0]);
            reader.readAsDataURL(file);
            console.log("Selected File : ", selectedfile);
        }
    }

    const DeleteSelectFile = () => {
        if(window.confirm("Are you sure you want to delete this Image?")){
            SetSelectedFile(null);
        }else{
            // alert('No');
        }
        
    }

    const FileUploadSubmit = async (e: any) => {
        e.preventDefault();

        // form reset on submit 
        e.target.reset();
        if (selectedfile !== null) {
            console.log("Selected File in file upload: ", selectedfile);
            console.log("Type of: ", typeof selectedfile?.fileimage)

            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
            const formData = new FormData();
            formData.append('file', selectedfile?.f_file);
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: formData,
                redirect: 'follow'
            };
            var res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ocr`, requestOptions);
            res = await res.json();
            console.log("Response: ", res);
            if (res?.status === 201) {
                toast.success(res?.message);
            } else {
                toast.error('Error in uploading file');
            }
            SetSelectedFile(null);
        } else {
            alert('Please select file')
        }
    }


    const DeleteFile = async () => {
        if(window.confirm("Are you sure you want to delete this Image?")){
            SetFiles([]);
        }
    }
   
    return(
        <div className="fileupload-view">
                <div className="row justify-content-center m-0">
                    <div className="col-md-6">
                        <div className="card mt-5">
                            <div className="card-body">
                                <div className="kb-data-box">
                                    <div className="kb-modal-data-title">
                                        <div className="kb-data-title">
                                            <h6>Single File Upload With Preview</h6>
                                        </div>
                                    </div>
                                    <form onSubmit={FileUploadSubmit}>
                                        <div className="kb-file-upload">
                                            <div className="file-upload-box">
                                                <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} />
                                                <span>Drag and drop or <span className="file-link">Choose your file</span></span>
                                            </div>
                                        </div>
                                        <div className="kb-attach-box mb-3">
                                        {selectedfile !== null ?
                                            <div className="file-atc-box">
                                                {
                                                    selectedfile?.filename?.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                        <div className="file-image"> <img src={selectedfile.fileimage} alt="" /></div> :
                                                        <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                }
                                                <div className="file-detail">
                                                    <h6>{selectedfile?.filename}</h6>
                                                    <p><span>Size : {selectedfile?.filesize}</span><span className="ml-2">Modified Time : {selectedfile?.datetime}</span></p>
                                                </div>
                                            </div>
                                            : ''}
                                        </div>
                                        <div className="kb-buttons-box">
                                            <button type="submit" className="btn btn-primary form-submit">Upload</button>
                                        </div>
                                    </form>
                                    {Files.length > 0 ?
                                        <div className="kb-attach-box">
                                            <hr />
                                            {
                                                Files.map((data, index) => {
                                                    const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                    return (
                                                        <div className="file-atc-box" key={index}>
                                                            {
                                                                filename?.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                    <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                    <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                            }
                                                            <div className="file-detail">
                                                                <h6>{filename}</h6>
                                                                <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p>
                                                                <div className="file-actions">
                                                                    <button className="file-action-btn" onClick={() => DeleteFile(id)}>Delete</button>
                                                                    <a href={fileimage}  className="file-action-btn" download={filename}>Download</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    );
}