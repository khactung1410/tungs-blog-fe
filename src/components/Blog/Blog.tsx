import React, { FormEventHandler } from 'react';
import InputField from '../Common/InputField';
import { FormSection } from './Blog.styled';

const Blog: React.FC = () => {
  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('submit');
  };
  return (
    <div>
      <div style={{ height: '85px' }} />
      <h1>Create Blog</h1>
      <form onSubmit={submit}>
        <FormSection>
          <InputField
            label="Quantity"
            id="erx-quantity"
            value="value in store"
            placeholder="Enter"
            maxLength={11}
            onChange={() => {
              // const currentPrescription = getCurrentPrescription();
              // if (!currentPrescription) return;
              // currentPrescription.quantity = item;
              // sideNavStore.updatePrescription(currentPrescription);
            }}
            // error={sideNavStore.getCurrentPrescription?.validation?.quantity}
          />
        </FormSection>
      </form>
    </div>
  );
};

export default Blog;
