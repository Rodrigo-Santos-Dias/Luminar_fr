import React, { useContext, useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


import CardCategories from '../cardCategories/CardCategories';
import Categories from '../../../models/Categories';
import { AuthContext } from '../../../contexts/AuthContext';
import { find } from '../../../services/Services';

function ListCategories() {
  const [categories, setCategory] = useState<Categories[]>([]);

  let navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function findCategory() {
    try {
      await find('/categories', setCategory, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('The token has expired, please log in again')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('You need to be logged');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    findCategory();
  }, [categories.length]);
  return (
    <>
      {categories.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <>
                 <CardCategories key={category.id} categories={category} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListCategories;