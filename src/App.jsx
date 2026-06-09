import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ecommContext from './contexts/ContextProvider';
import Cart from "./pages/Cart";
import Wishlist from './pages/Wishlist';
import Home from './pages/Home';

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/wishlist",
    element: <Wishlist />
  },
  {
    path: "/cart",
    element: <Cart />
  }
])

const initialBookData = [
  {
    title: "Zero To One: Notes On Startups Or How To Build The Future",
    author: "Blake Masters & Peter Thiel",
    category: "Business",
    rating: 4.5,
    description: [
      "Zero to One is about how to build companies that create new things.",
      "It draws on everything the PayPal and Palantir co-founder learned.",
      "This book delivers completely new and refreshing ideas on how to create value in the world."
    ],
    price: 699,
    discountedPrice: 629,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/e0e0e0/606060.png?text=Zero+To+One&font=roboto"

  },
  {
    title: "Surely You're Joking Mr. Feynman",
    author: "Richard P Feynman",
    category: "Non-Fiction",
    rating: 4.0,
    description: [
      "The hilarious, eccentric, and brilliant life adventures of Nobel Prize-winning physicist Richard Feynman.",
      "Features wild escapades, from cracking top-secret safes at Los Alamos to playing samba drums in Brazil.",
      "An unforgettable collection of pranks, insights, and a profound celebration of scientific curiosity."
    ],
    price: 699,
    discountedPrice: 629,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/e0e0e0/606060.png?text=Mr.Feynman&font=roboto"
  },
  {
    title: "Quantitative Aptitude for CAT",
    author: "Arun Sharma",
    category: "Exam",
    rating: 4.8,
    description: [
      "The definitive, comprehensive guide tailored specifically for mastering the Quantitative Aptitude section of the CAT exam.",
      "Features structured chapters broken down into three distinct Levels of Difficulty (LODs) to build problem-solving speed and accuracy.",
      "Packed with expert strategies, shortcuts, and fully solved mock questions designed by a multi-time CAT topper."
    ],
    price: 999,
    discountedPrice: 799,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/e0e0e0/606060.png?text=QA+for+CAT&font=roboto"
  },
  {
    title: "Verbal Aptitude & Reading Comprehension for CAT",
    author: "Arun Sharma",
    category: "Exam",
    rating: 4.8,
    description: [
      "The definitive, comprehensive guide tailored specifically for mastering the VARC section of the CAT exam.",
      "Features structured chapters broken down into three distinct Levels of Difficulty (LODs) to build problem-solving speed and accuracy.",
      "Packed with expert strategies, shortcuts, and fully solved mock questions designed by a multi-time CAT topper."
    ],
    price: 999,
    discountedPrice: 799,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/e0e0e0/606060.png?text=VARC+for+CAT&font=roboto"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    rating: "4.5",
    description: [
      "A Pulitzer Prize-winning classic that explores the profound themes of racial injustice and the destruction of innocence in the American South.",
      "Told through the unforgettable voice of young Scout Finch as her father, Atticus, courageously defends a wrongly accused Black man.",
      "A powerful, deeply moving narrative that examines compassion, moral courage, and human prejudice."
    ],
    price: 699,
    discountedPrice: 629,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/e0e0e0/606060.png?text=Mockingbird&font=roboto"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Non-Fiction",
    rating: 4.8,
    description: [
      "An easy and proven framework to break bad habits and build good ones.",
      "Draws on biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable.",
      "Focuses on the power of tiny 1% changes to deliver massive, life-altering long-term results."
    ],
    price: 599,
    discountedPrice: 479,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/C2FFD9/0B6623.png?text=Atomic+Habits&font=roboto"
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    rating: 3.4,
    description: [
      "A modern approach to building companies and launching products through continuous innovation.",
      "Introduces the concept of the Minimum Viable Product (MVP) to prevent wasting time and resources.",
      "Provides a rigorous framework to test, measure, and pivot ideas rapidly in highly uncertain markets."
    ],
    price: 799,
    discountedPrice: 699,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/D0E1FD/1B4D8F.png?text=Lean+Startup&font=roboto"
  },
  {
    title: "Data Interpretation & Logical Reasoning for CAT",
    author: "Arun Sharma",
    category: "Exam",
    rating: 4.7,
    description: [
      "The definitive guide designed to conquer the tricky DILR section of management entrance exams.",
      "Features caselets, arrangements, and charts systematically graded from conceptual clarity to expert difficulty.",
      "Provides advanced shortcut approaches and accurate step-by-step methodologies for data sets."
    ],
    price: 899,
    discountedPrice: 749,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/FFE4C4/8B4513.png?text=DILR+for+CAT&font=roboto"
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    rating: 3.9,
    description: [
      "A hauntingly prophetic dystopian masterpiece that warns against totalitarian rule, surveillance, and absolute control.",
      "Follows Winston Smith as he attempts to rebel against the omnipresent Big Brother and the thought-controlling Party.",
      "Explores timeless and chilling concepts like psychological manipulation, historical revisionism, and Newspeak."
    ],
    price: 499,
    discountedPrice: 399,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/FFC1C1/A30000.png?text=1984&font=roboto"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    rating: 3.7,
    description: [
      "Explores the fascinating ways people think about money through 19 short, highly engaging stories.",
      "Proves that doing well with money isn’t about what you know, but rather how you behave.",
      "Offers invaluable insights on greed, risk, humility, and the true path to sustainable financial freedom."
    ],
    price: 450,
    discountedPrice: 380,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/E6E6FA/4B0082.png?text=Psych+Money&font=roboto"
  },
  {
    title: "The Subtle Art of Making Money Quick",
    author: "John Cash",
    category: "Business",
    rating: 2.7,
    description: [
      "A repetitive guide promising rapid wealth generation through basic, unoriginal financial tips.",
      "Critiques point out a severe lack of actionable business strategies or real-world case studies.",
      "Mainly relies on surface-level motivational quotes rather than concrete corporate insights."
    ],
    price: 399,
    discountedPrice: 349,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/FFD2A6/D97706.png?text=Making+Money+Quick&font=roboto"
  },
  {
    title: "Cracking the Advanced Calculus Code",
    author: "R. K. Verma",
    category: "Exam",
    rating: 2.3,
    description: [
      "An unorganized study guide aimed at competitive mathematics and engineering examinations.",
      "Contains numerous unresolved printing errors, incorrect answer keys, and confusing step-by-step proofs.",
      "Fails to provide conceptual clarity for beginners, jumping straight into complex problems without explanation."
    ],
    price: 650,
    discountedPrice: 599,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/FCA5A5/DC2626.png?text=Advanced+Calculus&font=roboto"
  },
  {
    title: "The Whispering Shadows",
    author: "Anonymous Writer",
    category: "Fiction",
    rating: 1.8,
    description: [
      "A poorly paced mystery novel filled with severe plot holes, flat characters, and an unsatisfying ending.",
      "Critically panned by readers for its predictable twists and highly repetitive dialogue choices.",
      "Fails to build tension or deliver the suspense promised by its atmospheric cover blurb."
    ],
    price: 299,
    discountedPrice: 199,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/E9D5FF/7E22CE.png?text=Whispering+Shadows&font=roboto"
  },
  {
    title: "10 Days to Absolute Enlightenment",
    author: "Guru Peace",
    category: "Non-Fiction",
    rating: 1.2,
    description: [
      "An incredibly short, generic self-help guide that offers cliché solutions to complex lifestyle problems.",
      "Widely criticized for making unrealistic pseudoscientific health claims without any supporting evidence.",
      "Reads more like a collection of internet blog posts than a cohesive literary work."
    ],
    price: 499,
    discountedPrice: 249,
    inStock: "true",
    imageUrl: "https://placehold.co/300x450/CBD5E1/475569.png?text=Absolute+Enlightenment&font=roboto"
  }
]

function App() {
  const [category, setCategory] = useState([])
  const [rating, setRating] = useState(0)
  const [sort, setSort] = useState("")

  let filteredBooks = [...initialBookData];

  //category filter if active
  if (category.length > 0) {
    filteredBooks = filteredBooks.filter((book) => category.includes(book.category));
  }

  //rating filter if active
  if (rating > 0) {
    filteredBooks = filteredBooks.filter((book) => Number(book.rating) >= rating);
  }

  //sort filter if active
  if (sort === "LOW_TO_HIGH") {
    filteredBooks.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (sort === "HIGH_TO_LOW") {
    filteredBooks.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }

  //handles changing the filter arrays
  function handleCategoryFilter(event) {
    const value = event.target.value
    const isChecked = event.target.checked
    if (isChecked) {
      setCategory([...category, value])
    } else {
      setCategory(category.filter((item) => item !== value))
    } 
    // Notice: No manual filter triggering needed anymore!
  }

  return (
    <ecommContext.Provider value={{ bookData: filteredBooks, category, rating, sort, setSort, setRating, handleCategoryFilter }}>
      <RouterProvider router={router} />
    </ecommContext.Provider>
  )
}

export default App
