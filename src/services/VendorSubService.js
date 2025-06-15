import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/packages'
const Vendor_URL = 'http://127.0.0.1:8000/api/vendor/profile'
const VendorOrder_URL = 'http://127.0.0.1:8000/api/vendor/orders'

export const getPackages = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const packages = response.data.data || []; 
        console.log('Fetched Packages:', packages);
        const transformedPackages = packages.map(pkg => ({
            ...pkg,
            items: pkg.items ? pkg.items.split(',') : []
        }));
        
        return transformedPackages;
    } catch (error) {
        console.error('Error fetching packages:', error);
        return [];
    }
};

export const getVendorData = async (token) => {
    try {
        const response = await axios.get(`${Vendor_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const vendor = response.data || [];
        console.log('vendor data :', vendor);
        return vendor;
    }
    catch (error) {
        console.log('Error Fetching the vendor data', error);
        return [];
    }
};


export const getVendorOrders = async (token) => {
    try {
        const response = await axios.get(`${VendorOrder_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const vendororder = response.data || [];
        console.log('vendor order data :', vendororder);
        return vendororder;
    }
    catch (error) {
        console.log('Error Fetching the vendor order data', error);
        return [];
    }
};