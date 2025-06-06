import { ReactNode } from 'react';
import { CategoryType } from '../../types/category';

interface CategoryLayoutProps {
  type: CategoryType;
  title: string;
  description: string;
  children: ReactNode;
}

export const CategoryLayout = ({
  type,
  title,
  description,
  children
}: CategoryLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </div>
  );
}; 