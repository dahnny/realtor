import React, {useState} from "react";
import Cover from "./components/Cover";
import './App.css';
import Wallet from "./components/Wallet";
import {Container, Nav} from "react-bootstrap";
import Properties from "./components/marketplace/Properties";
import {indexerClient, myAlgoConnect} from "./utils/constants";
import {Notification} from "./components/utils/Notifications";
// import coverImg from "./assets/img/sandwich.jpg"

const App = function AppWrapper() {

    const [address, setAddress] = useState(null);
    const [name, setName] = useState(null);
    const [balance, setBalance] = useState(0);

    const fetchBalance = async (accountAddress) => {
        indexerClient.lookupAccountByID(accountAddress).do()
            .then(response => {
                const _balance = response.account.amount;
                setBalance(_balance);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const connectWallet = async () => {
        myAlgoConnect.connect()
            .then(accounts => {
                const _account = accounts[0];
                setAddress(_account.address);
                setName(_account.name);
                fetchBalance(_account.address);
            }).catch(error => {
            console.log('Could not connect to MyAlgo wallet');
            console.error(error);
        })
    };

    const disconnect = () => {
        setAddress(null);
        setName(null);
        setBalance(null);
    };

    return (
        <>
            <Notification/>
            {address ? (
                <Container fluid="md">
                    <Nav className="justify-content-end pt-3 pb-5">
                        <Nav.Item>
                            <Wallet
                                address={address}
                                name={name}
                                amount={balance}
                                disconnect={disconnect}
                                symbol={"ALGO"}
                            />
                        </Nav.Item>
                    </Nav>
                    <main>
                        <Properties address={address} fetchBalance={fetchBalance}/>
                    </main>
                </Container>
            ) : (
                <Cover name={"Realtor dapp"} coverImg={"https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?cs=srgb&dl=pexels-david-mcbee-1546168.jpg&fm=jpg"} connect={connectWallet}/>
            )}
        </>
    );
}

export default App;
