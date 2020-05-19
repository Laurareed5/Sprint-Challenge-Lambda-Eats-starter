import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import UsersList from "./UsersList";

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
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState([]);

  const [formState, setFormState] = useState({
    name: "",
    size: "",
    toppings: "",
    instructions: "",
  });

  const [errorState, setErrorState] = useState({
    name: "",
    size: "",
    toppings: "",
    instructions: "",
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {});
  }, [formState]);

  const validate = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [event.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (event) => {
    event.persist();
    validate(event);
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {
        setPost([]);
        setUsers([...users, response.data]);
      })
      .catch((err) => console.log(err.response));
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
        {errorState.name.length > 0 ? (
          <p className="error">{errorState.name}</p>
        ) : null}
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
        {errorState.instructions.length > 0 ? (
          <p className="error">{errorState.instructions}</p>
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
        anchovies
        <input
          type="checkbox"
          name="anchovi"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <br />
      <button type="submit">Add to Order</button>
      {post.length > 0 ? <pre>{JSON.stringify(post, null, 2)}</pre> : null}
      <UsersList users={users} />
    </form>
  );
}
