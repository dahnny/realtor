import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import AddProperty from "./AddProperty";
import Property from "./Property";
import Loader from "../utils/Loader";
import {NotificationError, NotificationSuccess} from "../utils/Notifications";
import {buyPropertyAction, createPropertyAction, likeAction, sellAction,  deletePropertyAction, getPropertyAction,} from "../../utils/marketplace";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";

const Properties = ({address, fetchBalance}) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProperties = async () => {
        setLoading(true);
        getPropertyAction()
            .then(properties => {
                if (properties) {
                    setProperties(properties);
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(_ => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getProperties();
    }, []);

    const createProperty = async (data) => {
        setLoading(true);
        createPropertyAction(address, data)
            .then(() => {
                toast(<NotificationSuccess text="Property added successfully."/>);
                getProperties();
                fetchBalance(address);
            })
            .catch(error => {
                console.log(error);
                toast(<NotificationError text="Failed to create a property."/>);
                setLoading(false);
            })
    };


    const likeProperty = async (property) => {
        setLoading(true);
        likeAction(address, property)
            .then(() => {
                toast(<NotificationSuccess text="Property liked successfully"/>);
                getProperties();
                fetchBalance(address);
            })
            .catch(error => {
                console.log(error)
                toast(<NotificationError text="Failed to like property."/>);
                setLoading(false);
            })
    };


    const sellProperty = async (property) => {
        setLoading(true);
        sellAction(address, property)
            .then(() => {
                toast(<NotificationSuccess text="Sale set successfully"/>);
                getProperties();
                fetchBalance(address);
            })
            .catch(error => {
                console.log(error)
                toast(<NotificationError text="Failed to set sale."/>);
                setLoading(false);
            })
    };



    const buyProperty = async (property) => {
        setLoading(true);
        buyPropertyAction(address, property)
            .then(() => {
                toast(<NotificationSuccess text="Property bought successfully"/>);
                getProperties();
                fetchBalance(address);
            })
            .catch(error => {
                console.log(error)
                toast(<NotificationError text="Failed to buy property."/>);
                setLoading(false);
            })
    };

    const deleteProperty = async (property) => {
        setLoading(true);
        deletePropertyAction(address, property.appId)
            .then(() => {
                toast(<NotificationSuccess text="property deleted successfully"/>);
                getProperties();
                fetchBalance(address);
            })
            .catch(error => {
                console.log(error)
                toast(<NotificationError text="Failed to delete property."/>);
                setLoading(false);
            })
    };

    if (loading) {
        return <Loader/>;
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fs-4 fw-bold mb-0">Realtor</h1>
                <AddProperty createProperty={createProperty}/>
            </div>
            <Row xs={1} sm={2} lg={3} className="g-3 mb-5 g-xl-4 g-xxl-5">
                <>
                    {properties.map((data, index) => (
                        <Property
                            address={address}
                            property={data}
                            buyProperty={buyProperty}
                            likeProperty = {likeProperty}
                            sellProperty = {sellProperty}
                            deleteProperty={deleteProperty}
                            key={index}
                        />
                    ))}
                </>
            </Row>
        </>
    );
};

Properties.propTypes = {
    address: PropTypes.string.isRequired,
    fetchBalance: PropTypes.func.isRequired
};

export default Properties;
