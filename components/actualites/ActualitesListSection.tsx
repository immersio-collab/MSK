"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  color: string;
}

const dummyPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Comment reconnaître les premiers signes d'un TDAH chez l'enfant ?",
    excerpt: "L'inattention ou l'hyperactivité peuvent être difficiles à interpréter chez les jeunes enfants. Voici les 5 signes qui doivent vous amener à consulter.",
    category: "Conseils Parents",
    date: "15 Oct 2023",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    color: "bg-msk-coral-500",
  },
  {
    id: "post-2",
    title: "La méthode Montessori : Pourquoi est-elle idéale pour l'inclusion ?",
    excerpt: "En s'adaptant au rythme de chacun, la pédagogie Montessori offre un cadre sécurisant pour les enfants à besoins spécifiques.",
    category: "Pédagogie",
    date: "02 Nov 2023",
    image: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&q=80&w=800",
    color: "bg-msk-sun-500",
  },
  {
    id: "post-3",
    title: "Journée portes ouvertes : Venez découvrir nos nouveaux espaces",
    excerpt: "Le centre MSK a le plaisir de vous inviter à sa journée portes ouvertes le samedi 25 Novembre. Visite de la salle Neuro-Gym au programme.",
    category: "Événement",
    date: "10 Nov 2023",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    color: "bg-msk-blue-500",
  },
  {
    id: "post-4",
    title: "Neuro-Gym : Les bienfaits de l'activité neuro-motrice sur la concentration",
    excerpt: "Découvrez comment des exercices physiques ciblés peuvent aider votre enfant à mieux réguler son attention en classe.",
    category: "Thérapie",
    date: "28 Nov 2023",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800",
    color: "bg-slate-600",
  },
  {
    id: "post-5",
    title: "Gérer les devoirs avec un enfant dyslexique : 3 astuces simples",
    excerpt: "Le moment des devoirs se transforme souvent en conflit. Voici des stratégies concrètes pour apaiser ce moment crucial.",
    category: "Conseils Parents",
    date: "05 Dec 2023",
    image: "https://images.unsplash.com/photo-1425421598808-4a22ce59fc97?auto=format&fit=crop&q=80&w=800",
    color: "bg-msk-coral-500",
  },
  {
    id: "post-6",
    title: "L'importance de la guidance parentale dans le parcours thérapeutique",
    excerpt: "Un accompagnement réussi implique toujours les parents. Découvrez pourquoi nous accordons une place centrale à la guidance parentale.",
    category: "Pédagogie",
    date: "12 Dec 2023",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    color: "bg-msk-sun-500",
  }
];

export const ActualitesListSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-[#FAF8F5] rounded-3xl overflow-hidden border border-msk-cream-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-xs ${post.color}`}>
                    <Tag className="w-3.5 h-3.5" />
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 md:p-8 flex flex-col grow">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-msk-night-900 mb-3 leading-snug group-hover:text-msk-coral-500 transition-colors">
                  <Link href={`/actualites/${post.id}`}>
                    {post.title}
                    <span className="absolute inset-0 z-0"></span>
                  </Link>
                </h3>
                
                <p className="text-msk-night-700/90 leading-relaxed mb-6 grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-msk-cream-200/50 flex items-center text-msk-night-900 font-bold group-hover:text-msk-coral-500 transition-colors">
                  Lire l'article
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
