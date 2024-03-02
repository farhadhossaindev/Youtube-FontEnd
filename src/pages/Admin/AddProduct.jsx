import Layout from '../../components/Layout'
import '../../App.css'
import AdminMenu from './AdminMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddProduct() {

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setquantity] = useState('')
  const [shipping, setShipping] = useState('')


  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong fetching categories');
    }
  }


  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <Layout>
      <div className='flex '>
        <div className='w-[20%]  bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
          <AdminMenu />
        </div>

        <div className='w-[80%] pl-6'>
          <div className='text-3xl text-center pt-3 font-medium'>Manage Product</div>
          <div className="m-1 flex justify-center mt-5">

            <select
              className="select select-warning w-full max-w-xs"
              defaultValue="Select Category" // or use `value` if you want to control it through state
              onChange={(event) => setCategory(event.target.value)}
            >
              <option disabled>Select Category</option>
              {categories.map(c => (
                <option key={c._id} >{c.name}</option>

              ))}

            </select>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddProduct