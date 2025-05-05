import React from 'react';
import VendorNavbar from '../../../components/VendorNavbar/VendorNavbar';
import Footer from '../../../components/Footer/Footer';
import PackageCard from '../../../components/VendorPackage/VendorPackage';
import './VendorHome.css';
const VendorHome = () => {
    return (
        <div>
            <VendorNavbar />
            <div className='Vendor-package-display'>
                <PackageCard
                    title="basic pakage"
                    tier="BASIC"
                    price="$10,99"
                    features={["Lorem ipsum", "Dolor sit amet", "consectetur"]}
                    buttonColor='#ff5b89'
                />
                <PackageCard
                    title="standard pakage"
                    tier="STANDARD"
                    price="$29,99"
                    features={["Lorem ipsum", "Dolor sit amet", "consectetur"]}
                    buttonColor='#1ca9c9'
                />
                <PackageCard
                    title="premium pakage"
                    tier="PREMIUM"
                    price="$49,99"
                    features={["Lorem ipsum", "Dolor sit amet", "consectetur"]}
                    buttonColor='#6e5da6'
                />
            </div>
            <Footer />
        </div>
    )
}

export default VendorHome
