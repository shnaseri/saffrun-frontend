import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
  Button,
} from "reactstrap";
import Dropzone from "react-dropzone";
import "../../../assets/scss/plugins/extensions/dropzone.scss";
import { DropzoneArea } from "material-ui-dropzone";
import "./dropzone.css";
import { UploadCloud } from "react-feather";
import { toast } from "react-toastify";
import {urlDomain} from "./../../../utility/urlDomain";
import axios from "axios";
import isAuthenticated from "./../../../utility/authenticated";
import { history } from "./../../../history";

class DropzoneBasic extends React.Component {
  state = {
    files: [],

  };

  errorMessage = (message, variant) => {
    if (variant === "error") {
      if (message.includes("allowed number"))
        toast.error("حداکثر تعداد فایل قابل بارگذاری ۶ عدد می‌باشد.", {
          position: toast.POSITION.TOP_CENTER,
        });
      else
        toast.error("حداکثر حجم فایل قابل قبول ۶ مگابایت می‌باشد.", {
          position: toast.POSITION.TOP_CENTER,
        });
    }
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>آپلود عکس</CardTitle>
        </CardHeader>
        <CardBody>
          <DropzoneArea
            initialFiles={this.props.imageUrlList}
            
            dropzoneText="عکس مورد نظر را انتخاب یا به روی مکان زیر بکشید"
            onChange={(files) => this.props.imageUploaded(files)}
            dropzoneClass="my-dropzone-style"
            dropzoneParagraphClass="my-dropzone-font"
            Icon={UploadCloud}
            onAlert={(message, variant) => this.errorMessage(message, variant)}
            showAlerts={false}
            previewGridClasses={{
              item:
                "MuiGrid-root MuiDropzonePreviewList-imageContainer MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4",
            }}
            acceptedFiles={["image/*"]}
            filesLimit={6}
            maxFileSize={6500000}
          />
        </CardBody>
      </Card>
    );
  }
}

export default DropzoneBasic;
