import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [errorMsg, seterrorMsg] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-ordering-app-566f4-default-rtdb.firebaseio.com/meals.json"
      );

      // if (!response.ok) {
      //   throw new Error("Something went wrong !");
      // }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setmeals(loadedMeals);
      setisloading(false);
    };

    //can't use try and catch block for error handling because fetchmeals is an async function and it will return promise if we handling error inside promise then we are rejecting promise

    fetchMeals().catch((error) => {
      setisloading(false);
      seterrorMsg(error.message);
    });
  }, []);

  if (isloading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }

  if (errorMsg) {
    return (
      <section className={classes.MealsError}>
        <p> {errorMsg} </p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
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
