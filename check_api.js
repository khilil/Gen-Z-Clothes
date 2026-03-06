import axios from 'axios';

async function checkApi() {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/products');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2).substring(0, 500));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

checkApi();
