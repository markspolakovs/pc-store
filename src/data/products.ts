import { Product } from "../Product/types";

const data: Product[] = [
  {
    id: "nothing",
    name: "Nothing",
    price: 499,
    buyable: true,
    available: true,
    description:
      "The Pupils' Committee is proud to offer the students the ultimate commerce experience - the ability\n to buy nothing for €4.99. This is not only a waste of money. This is an experience.\n An opportunity for you to discover the true meaning of the capitalist system that you\n and I have been brought up in. For the low, low price of €4.99, you can achieve true\n cultural and spiritual enlightenment, and it's all thanks to us.\n This is the revolution. Join the revolution.\n",
    faq: [
      {
        question: "Will I get something if I give you my money?",
        answer: "No."
      },
      {
        question: "Why are you selling nothing?",
        answer: "Dunno. Because we can."
      },
      {
        question: "Whose idea was this?",
        answer:
          "It was a collective thought process, democratically chosen out of a shortlist of seven options. The selection subcommittee, consisting of one member, unanimously agreed Nothing was the best product to sell."
      },
      {
        question: "But really, will I get something?",
        answer:
          "No. We're not even taking your address. All we have to offer is nothing."
      }
    ]
  },
  {
    id: "nothing-5pack",
    name: "Nothing - 5-Pack",
    price: 2994,
    buyable: false,
    available: true,
    description: "If you didn't already have enough capitalism, have even more! We present, Nothing - the 5-pack! Now you can get five units of absolutely nothing for the price of six! We've never seen a better deal here, and we doubt you have either!"
  },
  {
    id: "decent-bac-schedule",
    name: "Decent Bac Schedule",
    price: 99999999999,
    buyable: false,
    available: false
  },
  {
    id: "coca-cola-in-cafeteria",
    name: "Coca-Cola in Cafeteria",
    price: 999,
    buyable: false,
    available: true,
    description: "Tired of constantly asking for Coca-Cola and its other sugary friends, only to have your request rejected for \"health reasons\" or something silly like that? A little bribery never hurt anyone... note: the Pupils' Committee does not support bribery in any way, and is not responsible for any consequences as a result of purchasing this item",
    imageUrl: "https://www.cokesolutions.com/content/cokesolutions/site/us/en/equipment/vending-machines/jcr:content/contentParsys/coolersandfountains_1809938134.image.350-449.png"
  },
  {
    id: "new-couch",
    name: "New Couch",
    price: 49999,
    buyable: false,
    available: true,
    imageUrl: "https://cdn-images.article.com/products/SKU312G/2890x1500/image24398.jpg?w=400"
  },
  {
    id: "rip-dst",
    name: "Abolition of Daylight Savings Time",
    price: 444999999,
    buyable: false,
    available: true,
    description: "About time."
  },
  {
    id: "pomelo",
    name: "Avocado",
    price: 49,
    buyable: false,
    available: true,
    description: "It's an avocado.",
    imageUrl: "https://www.organicfacts.net/wp-content/uploads/2013/06/pomelo.jpg"
  },
  {
    id: "wat",
    name: "Coming Soon!",
    price: 7499,
    buyable: false,
    available: false
  },
  {
    id: "norlywat",
    name: "Coming Soon!",
    price: 12999,
    buyable: false,
    available: false
  },
  {
    id: "ffs",
    name: "Coming Soon!",
    price: 149999,
    buyable: false,
    available: false
  }
];

export default data;
