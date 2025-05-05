import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BackgroundUploader from "../../components/3D/BackgroundUploader/BackgroundUploader";
import DesignScene from "../../components/3D/DesignScene/DesignScene";
import CustomizerPanel from "../../components/3D/CustomizerPanel/CustomizerPanel";
import DragDropClipboard from "../../components/3D/DragDropClipboard/DragDropClipboard";
import "./DesignerPage.css";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import Navbar from "../../components/Navbar/Navbar";
import BottomNavBar from "../../components/BottomNavbar/BottomNavbar";
import Footer from '../../components/Footer/Footer';

const DesignerPage = () => {
    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="designer-container">
                <DndProvider backend={HTML5Backend}>
                    <DragDropClipboard />
                    {/*  workplace */}
                    <DesignScene />
                </DndProvider>
                <BackgroundUploader />
            </div>
            <Footer />
        </>

    );
};

export default DesignerPage;