import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {stringToMicroAlgos} from "../../utils/conversions";

const AddProperty = ({createProperty}) => {

    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [sellprice, setSellPrice] = useState(0);

    const isFormFilled = useCallback(() => {
        return image && description && location && sellprice > 0
    }, [image, description, location, sellprice]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                onClick={handleShow}
                variant="dark"
                className="rounded-pill px-0"
                style={{width: "38px"}}
            >
                <i className="bi bi-plus"></i>
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Property</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                       
                        <FloatingLabel
                            controlId="inputUrl"
                            label="Image URL"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Image URL"
                                value={image}
                                onChange={(e) => {
                                    setImage(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="inputDescription"
                            label="Description"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="description"
                                style={{ height: "80px" }}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="inputLocation"
                            label="Location"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="location"
                                style={{ height: "80px" }}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="inputPrice"
                            label="Price in ALGO"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Price"
                                onChange={(e) => {
                                    setSellPrice(stringToMicroAlgos(e.target.value));
                                }}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                </Form>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="dark"
                        disabled={!isFormFilled()}
                        onClick={() => {
                            createProperty({
                                image,
                                description,
                                location,
                                sellprice
                            });
                            handleClose();
                        }}
                    >
                        Save property
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

AddProperty.propTypes = {
    createProperty: PropTypes.func.isRequired,
};

export default AddProperty;
