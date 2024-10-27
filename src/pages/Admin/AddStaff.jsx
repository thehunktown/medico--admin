import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios, {isCancel, AxiosError} from 'axios';

const AddStaff = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [degree, setDegree] = useState('')
  // const [education, setEducation] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  // here add logic so that a permission based guy come and add staff
  /* in summery this backendurl, and atoken is coming from the adminContext, similarly i will create a userPermissionContext where,
  i will pass parameter userUrl, aToken, permissionId,  */
  const { backendUrl, aToken } = useContext(AdminContext)
  console.log("backendurl === "+ backendUrl); // Check if it's correct
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) {
        return toast.error('Image not selected..')
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', fees);
      formData.append('degree', degree);
      // formData.append('education', education);
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
      const { data } = await axios.post(backendUrl + '/api/admin/add-staff', formData, {
        headers: { aToken } // here we are sending aToken where it is capital T, but it in backend it is atoken where t is in small case that will get resolved/
      })

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('')
        setAbout('');
        // setExperience('1 Year');
        setFees('');
        setDegree('');
        // setEducation('');
        // setSpeciality('General physician');
        setAddress1('');
        setAddress2('');

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Staff</p>

      <div className='bg-white px-6 py-8 border rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto'>
        {/* Staff image upload section */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
            <img
              className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.add_staff}
              alt='Add Staff'
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
          <p>Upload staff <br /> picture</p>
        </div>

        {/* Form fields */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-600'>
          {/* Left column */}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p>Staff Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type='text' placeholder='Name' required />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Staff Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type='email' placeholder='Email' required />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Staff Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type='password' placeholder='Password' required />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Degree</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type='text' placeholder='Degree' required />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' required>
                <option value='1 Year'>1 Year</option>
                <option value='2 Years'>2 Years</option>
                <option value='3 Years'>3 Years</option>
                <option value='4 Years'>4 Years</option>
                <option value='5 Years'>5 Years</option>
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type='number' placeholder='Fee' required />
            </div>
          </div>

          {/* Right column */}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' required>
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatrician'>Pediatrician</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>
         {/* <div className='flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => setEducation(e.target.value)} value={education} className='border rounded px-3 py-2' type='text' placeholder='Education' required />
            </div> */}
            
            <div className='flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type='text' placeholder='Address 1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type='text' placeholder='Address 2' required />
            </div>
          </div>
        </div>

        {/* About staff section */}
        <div className='mt-4'>
          <p className='mb-2'>About</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className='w-full px-4 py-2 border rounded resize-none'
            placeholder='About Staff'
            rows={5}
            required
          />
        </div>

        {/* Submit button */}
        <div className='mt-4'>
          <button type='submit' className='bg-primary px-10 py-3 text-white rounded-full'>
            Add Staff
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddStaff;
