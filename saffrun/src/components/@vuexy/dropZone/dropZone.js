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

class DropzoneBasic extends React.Component {
  state = {
    files: [],
  };
  onDrop = (files) => {
    files = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    this.props.imageUploaded(files);
  };
  thumbs = () => {
    return this.props.files.map((file) => (
      <div className="dz-thumb" key={file.name}>
        <div className="dz-thumb-inner">
          <img src={file.preview} className="dz-img" alt={file.name} />
        </div>
      </div>
    ));
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>آپلود عکس</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="10" xs="9">
              <Dropzone multiple={false} onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <p className="mx-1">
                        عکس های خود را یا انتخاب و یا به روی مکان بارگذاری بکشید
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Col>
            <Col sm="2" xs="3">
              <Button
                style={{ marginTop: "20px" }}
                onClick={this.props.deleteImage}
                color="danger"
              >
                حذف عکس
              </Button>
            </Col>
          </Row>
          <div className="thumb-container">{this.thumbs()}</div>
        </CardBody>
      </Card>
    );
  }
}

export default DropzoneBasic;
