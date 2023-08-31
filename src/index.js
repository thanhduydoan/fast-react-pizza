import React, { StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    )
}

function Header() {
    return <header className="header">
        <h1>Fast React Pizza Co.</h1>
    </header>
}

function Menu() {
    const pizzas = pizzaData;
    const numPizza = pizzas.length
    return <main className="menu">
        <h2>Our menu</h2>
        {numPizza > 0 ? (
            <>
                <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious</p>
                <ul className="pizzas">
                    {pizzas.map((pizza) => (<Pizza pizzaObj={pizza} key={pizza.name} />))}
                </ul>
            </>
        ) : (<p>We'are still working on our menu. Please comback later.</p>)}
    </main>
}

function Footer() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const hour = new Date().getHours();
    const openHour = 9;
    const closeHour = 24;
    const isOpen = hour >= openHour && hour <= closeHour;
    console.log(isOpen)
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <footer className="footer">
            {isOpen ? (<Order hour={{ openHour, closeHour }} />
            ) : (<p>The time is now: {time}</p>)}
        </footer >
    )
}

function Order({ hour }) {
    return (
        <div className='order'>
            <p>
                We'are open to {hour.openHour}:00 from {hour.closeHour}: 00. Come visit on us or oder online.
            </p>
            <button className="btn"> Order</button>
        </div>
    )
}

function Pizza({ pizzaObj }) {
    return (
        <li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`
        } >
            <img src={pizzaObj.photoName} alt={pizzaObj.photoName} />
            <>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredients}</p>
                <span>{pizzaObj.soldOut ? ('SOLD OUT') : (pizzaObj.price)}</span>
            </>
        </li >
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<StrictMode><App /></StrictMode>)
