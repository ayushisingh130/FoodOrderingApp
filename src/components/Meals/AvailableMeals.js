import React from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Grilled Fish",
    description: "Finest fish and veggies",
    price: 200.99,
  },
  {
    id: "m2",
    name: "Veg Briyani",
    description: "Green and rice!",
    price: 290.5,
  },
  {
    id: "m3",
    name: "Chicken Burger",
    description: "American, raw, meaty",
    price: 320.99,
  },
  {
    id: "m4",
    name: "Vegetable soup",
    description: "Healthy...and green...",
    price: 310.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.meals}> {mealsList} </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
