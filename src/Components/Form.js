import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  size: yup.string().required("Please select size"),
  toppings: yup.boolean().oneOf([true], "Please choose your toppings"),
  pepperoni: yup.boolean().oneOf([true]),
  mushroom: yup.boolean().oneOf([true]),
  olive: yup.boolean().oneOf([true]),
  anchovi: yup.boolean().oneOf([true]),
  instructions: yup.string("Any Special Instructions?"),
});

export default function Form() {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [formState, setFormState] = useState({
    name: "",
    size: "",
    toppings: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    toppings: "",
    instructions: "",
  });

  const [post, setPost] = useState();

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqes.in/api/users", formState)
      .then((response) => {
        setPost(response.data);

        setFormState({
          name: "",
          size: "",
          toppings: "",
          instructions: "",
        });
      })
      .catch((err) => console.log(err.response));
  };

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    validateChange(event);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name:
        <br />
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <br />

      <label htmlFor="size">
        Size:
        <br />
        <select
          value={formState.size}
          id="size"
          name="size"
          onChange={inputChange}
        >
          <option value="personal">Personal</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </label>
      <br />

      <label htmlFor="instructions">
        Special Instructions:
        <br />
        <textarea
          name="instructions"
          value={formState.instructions}
          onChange={inputChange}
        />
        {errors.instructions.length > 0 ? (
          <p className="error">{errors.instructions}</p>
        ) : null}
      </label>
      <br />

      <label htmlFor="pepperoni">
        pepperonis
        <input
          type="checkbox"
          name="pepperoni"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <br />
      <label htmlFor="mushroom">
        mushrooms
        <input
          type="checkbox"
          name="mushroom"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <br />
      <label htmlFor="olive">
        olives
        <input
          type="checkbox"
          name="olive"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <br />
      <label htmlFor="anchovi">
        anchovis
        <input
          type="checkbox"
          name="anchovi"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button>Add to Order</button>
    </form>
  );
}
