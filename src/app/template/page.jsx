// components/DSARForm.js
'use client';
import { useState } from 'react';


export default function DSARForm() {
const [formData, setFormData] = useState({ name: '', email: '', company: '' });


const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


const handleSubmit = (e) => {
e.preventDefault();
console.log('Generate DSAR Template:', formData);
};


return (
<form onSubmit={handleSubmit} className="space-y-4">
<input name="name" placeholder="Your Name" onChange={handleChange} className="border p-2 w-full" />
<input name="email" placeholder="Your Email" onChange={handleChange} className="border p-2 w-full" />
<input name="company" placeholder="Company Name" onChange={handleChange} className="border p-2 w-full" />
<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Generate DSAR</button>
</form>
);
}