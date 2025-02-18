import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const services = [
  {
    title: "Производство корпоративной одежды",
    description: "Мы создаем качественную одежду для бизнеса и спорта, подчеркивая индивидуальность вашей компании."
  },
  {
    title: "Индивидуальный пошив на заказ",
    description: "От 50 единиц – эксклюзивные заказы с учетом всех пожеланий по материалам и дизайну."
  },
  {
    title: "Гарантия качества и долговечности",
    description: "Мы используем только проверенные ткани и технологии, чтобы ваша одежда служила долго."
  },
  {
    title: "Быстрые сроки производства",
    description: "Оптимизированные процессы позволяют нам выполнять заказы в кратчайшие сроки."
  }
];

const faqs = [
  { question: "Как сделать заказ?", answer: "Свяжитесь с нами через форму на сайте, и мы поможем вам оформить заказ." },
  { question: "Какие материалы вы используете?", answer: "Мы используем только качественные ткани, проверенные временем и практикой." },
  { question: "Можно ли заказать небольшой тираж?", answer: "Минимальный заказ от 20 единиц, индивидуальный пошив от 50 единиц." },
  { question: "Как долго длится производство?", answer: "Сроки зависят от объема заказа, в среднем от 10 до 20 рабочих дней." }
];

const Hero = () => (
  <div className="text-center py-16 bg-gray-100">
    <h1 className="text-5xl font-bold">Производство одежды для бизнеса и спорта</h1>
    <p className="mt-4 text-gray-600 text-lg">Качественная и долговечная одежда для успешных компаний.</p>
    <Button className="mt-6 px-8 py-3 bg-blue-600 text-white text-lg rounded-lg">Оставить заявку</Button>
  </div>
);

const Portfolio = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-center mb-6">Наши работы</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {["/work1.jpg", "/work2.jpg", "/work3.jpg"].map((src, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Image src={src} alt={`Пример работы ${index + 1}`} width={300} height={300} className="rounded-lg shadow-md" />
        </motion.div>
      ))}
    </div>
  </div>
);

const FAQ = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-center mb-6">Частые вопросы</h2>
    <div className="space-y-4">
      {faqs?.length > 0 ? (
        faqs.map((faq, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Вопросы не найдены.</p>
      )}
    </div>
  </div>
);

const Contact = () => (
  <div className="p-6 text-center bg-gray-200 rounded-lg mt-8">
    <h2 className="text-3xl font-bold">Свяжитесь с нами</h2>
    <p className="text-gray-600 text-lg">Оставьте заявку, и мы предложим вам лучшее решение.</p>
    <Button className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg">Оставить заявку</Button>
  </div>
);

const Services = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    {services?.length > 0 ? (
      services.map((service, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Card className="p-6 shadow-lg rounded-2xl">
            <CardContent>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))
    ) : (
      <p className="text-gray-600">Список услуг временно недоступен.</p>
    )}
  </div>
);

const HomePage = () => (
  <div>
    <Hero />
    <Services />
    <Portfolio />
    <FAQ />
    <Contact />
  </div>
);

export default HomePage;
