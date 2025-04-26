'use client';
import Image from "next/image";
import Hero from "@/components/custom/Hero";
import Header from "@/components/custom/Header";
import UserProfile from '../convex/UserProfile';

export default function Home() {
  return (
    <div>
      <Hero/>
      <UserProfile /> 
    </div>
  );
}
