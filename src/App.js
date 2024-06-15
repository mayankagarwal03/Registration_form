import React, { useState } from 'react';
import './index.css';
const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    countryCode: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'IN', label: 'India' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
  ];
  
  const cities = {
    US: [
      { value: 'NY', label: 'New York' },
      { value: 'LA', label: 'Los Angeles' },
      { value: 'CHI', label: 'Chicago' },
      { value: 'HOU', label: 'Houston' },
      { value: 'PHX', label: 'Phoenix' },
    ],
    IN: [
      { value: 'DEL', label: 'Delhi' },
      { value: 'MUM', label: 'Mumbai' },
      { value: 'KOL', label: 'Kolkata' },
      { value: 'CHN', label: 'Chennai' },
      { value: 'HYD', label: 'Hyderabad' },
    ],
    CA: [
      { value: 'TOR', label: 'Toronto' },
      { value: 'MTL', label: 'Montreal' },
      { value: 'VAN', label: 'Vancouver' },
      { value: 'CAL', label: 'Calgary' },
      { value: 'OTT', label: 'Ottawa' },
    ],
    GB: [
      { value: 'LON', label: 'London' },
      { value: 'BIR', label: 'Birmingham' },
      { value: 'MAN', label: 'Manchester' },
      { value: 'GLA', label: 'Glasgow' },
      { value: 'LIV', label: 'Liverpool' },
    ],
    AU: [
      { value: 'SYD', label: 'Sydney' },
      { value: 'MEL', label: 'Melbourne' },
      { value: 'BRI', label: 'Brisbane' },
      { value: 'PER', label: 'Perth' },
      { value: 'ADL', label: 'Adelaide' },
    ],
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    const newErrors = { ...errors };
    switch (name) {
      case 'firstName':
        newErrors.firstName = value.trim() ? '' : 'Please enter your first name.';
        break;
      case 'lastName':
        newErrors.lastName = value.trim() ? '' : 'Please enter your last name.';
        break;
      case 'country':
        newErrors.country = value ? '' : 'Please select a country.';
        break;
      case 'city':
        newErrors.city = value ? '' : 'Please select a city.';
        break;
        case 'aadharNo':
          newErrors.aadharNo = value.length === 12 ? '' : 'Invalid Aadhaar Number (12 digits)';
          break;
        case 'panNo':
          newErrors.panNo = !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value) ? 'Invalid PAN Number (format XXXXX9999X)' : '';
          break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid Email Address';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phoneNo) newErrors.phoneNo = 'Phone number is required';
    if (!formData.countryCode) newErrors.countryCode = 'Country Code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.aadharNo || !/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Invalid Aadhaar Number. Must be 12 digits.';
    }
    if (!formData.panNo || !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(formData.panNo)) {
      newErrors.panNo = 'Invalid PAN Number. Must be in format XXXXX9999X.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const showDetails = () => {
    return (
      <div>
        <h2>Submitted Details:</h2>
        <ul>
          {Object.entries(formData).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className='form-container'>
      <h1 className='aligntext-center'>Register</h1>
      {isSubmitted ? (
        showDetails()
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNo">Phone Number:</label>
            <div className="phone-input">
              <input
                type="tel"
                name="countryCode"
                id="countryCode"
                value={formData.countryCode}
                maxLength="4"
                onChange={handleChange}
                placeholder="Code"
              />
              <input
                type="tel"
                name="phoneNo"
                id="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>
            {errors.countryCode && (
              <p className="error">{errors.countryCode}</p>
            )}
            {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <select name="country" id="country" value={formData.country} onChange={handleChange}>
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {errors.country && <p className="error">{errors.country}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <select name="city" id="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
              <option value="">Select City</option>
              {formData.country &&
                cities[formData.country].map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
            </select>
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="panNo">Pan No.:</label>
            <input
              type="text"
              name="panNo"
              id="panNo"
              value={formData.panNo}
              onChange={handleChange}
            />
            {errors.panNo && <p className="error">{errors.panNo}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="aadharNo">Aadhar No.:</label>
            <input
              type="text"
              name="aadharNo"
              id="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
            />
            {errors.aadharNo && <p className="error">{errors.aadharNo}</p>}
          </div>
          <button type="submit" disabled={isSubmitted}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
