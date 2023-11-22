import React from 'react'
import InputField from '../components/InputField'

const WorkExperience = ({handleChange}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work experience</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="0" name="exp" />
          <span className="checkmark"></span>No experience
        </label>
        <InputField
          handleChange={handleChange}
          value="1-3"
          title="1-3 years"
          name="exp"
        />
        <InputField
          handleChange={handleChange}
          value="3-6"
          title="3-6 years"
          name="exp"
        />
        <InputField
          handleChange={handleChange}
          value="6+"
          title="over 6 years"
          name="exp"
        />
      </div>
    </div>
  );
}

export default WorkExperience