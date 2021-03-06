import React from 'react';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './PlaceForm.css';


const WithdrawDeposit = () => {
  const {  isLoading, error,sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      account: {
        value: '',
        isValid: false
      },
      amount: {
        value: '',
        isValid: false
      },
      type: {
        value: '',
        isValid: false
      }
    },
    false
  );
  const transactionSubmitHandler = async event => {
    
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:9000/admin/credit-debit',
        'POST',
        JSON.stringify({
          account: formState.inputs.account.value,
          amount: formState.inputs.amount.value,
          type: formState.inputs.type.value,
        }),
        { 'Content-Type': 'application/json' }
      );
    
    } catch (err) {}
  };
  return (
    <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={transactionSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="amount"
          element="input"
          type="text"
          label="Amount"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid amount."
          onInput={inputHandler}
        />
        <Input
          id="account"
          element="input"
          label="Account"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid account # (at least 10 digit)."
          onInput={inputHandler}
        />
        <Input
          id="type"
          element="input"
          label="Credit-Debit"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid type."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Complete Transaction
        </Button>
      </form>
    </React.Fragment>
  );
}

export default WithdrawDeposit; 