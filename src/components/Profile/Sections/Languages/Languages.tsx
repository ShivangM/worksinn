import { Language } from '@/interfaces/user';
import fetchLanguages from '@/lib/profile/fetchLanguages';
import { cookies } from 'next/headers';
import React from 'react';
import AddLanguageButton from './AddLanguageButton';
import DeleteLanguageButton from './DeleteLanguageButton';
import EditLanguageButton from './EditLanguageButton';

type LanguageCardProps = {
  language: Language;
  viewOnly: boolean;
};

const LanguageCard = ({ language, viewOnly }: LanguageCardProps) => {
  return (
    <div key={language.id} className="flex flex-col bg-gray-100 rounded-lg p-4">
      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            {language.language.name}
          </h3>

          {!viewOnly ? (
            <div className="flex items-center space-x-2">
              <EditLanguageButton language={language} />
              <DeleteLanguageButton language={language} />
            </div>
          ) : null}
        </div>

        <span className="text-sm text-gray-500">{language.level}</span>
      </div>
    </div>
  );
};

type LanguageProps = {
  viewOnly: boolean;
  userId?: string;
};

const Languages = async ({ viewOnly, userId }: LanguageProps) => {
  const token = cookies().get('token')?.value;
  const { data: languages } = await fetchLanguages(token, userId);

  return (
    <section title="Languages" className="profile-section">
      <div className="flex item-center justify-between">
        <h2>Languages</h2>
        {viewOnly ? null : <AddLanguageButton />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {languages.length > 0 ? (
          languages.map((language) => (
            <LanguageCard
              viewOnly={viewOnly}
              language={language}
              key={language.id}
            />
          ))
        ) : (
          <h3 className="text-gray-600">No languages added</h3>
        )}
      </div>
    </section>
  );
};

export default Languages;