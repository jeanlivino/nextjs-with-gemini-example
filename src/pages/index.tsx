import Image from 'next/image';
import { Inter } from 'next/font/google';
import { cva } from 'class-variance-authority';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

interface FormFields {
  company: string;
  industry: string;
  platform: string;
  topics: string[];
}

interface Post {
  title: string;
  content: string;
  hashtags: string[];
}

const inter = Inter({ subsets: ['latin'] });

const input = cva('p-3 w-full mt-2 rounded-md border border-gray-300');
const label = cva('text-md font-bold mt-3 block');

const topics = [
  { id: 'branding', name: 'Branding' },
  { id: 'vendas', name: 'Vendas' },
  { id: 'tecnologia', name: 'Tecnologia' },
  { id: 'educacao', name: 'Educacional' },
  { id: 'empreendedorismo', name: 'Empreendedorismo' },
];

export default function Home() {
  const { register, handleSubmit } = useForm<FormFields>();
  const [generatedPosts, setGeneratedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload: FormFields) => {
    try {
      setLoading(true);
      const { data } = await axios.post<Post[]>('/api/generate-posts', payload);
      setGeneratedPosts((state) => [...data, ...state]);

      console.log(data);
    } catch (error) {
      alert('Ocorreu um erro ao gerar as ideias de posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className='mx-auto max-w-5xl w-full font-mono'>
        <h1 className='text-4xl font-bold text-center text-purple-800'>
          Gerador de conteúdo para redes sociais
        </h1>

        <p className='text-center mt-5'>
          Crie ideias para posts nas redes sociais de forma rápida e prática.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid md:grid-cols-[2fr,1fr] gap-10 mt-10'>
            <div>
              <label className={label()}>Empresa:</label>
              <input
                type='text'
                className={input()}
                placeholder='Nome da empresa'
                required
                {...register('company')}
              />
              <label className={label()}>Ramo:</label>
              <input
                type='text'
                className={input()}
                placeholder='Digite o ramo de atuação'
                required
                {...register('industry')}
              />

              <label className={label()}>Plataforma:</label>
              <select className={input()} required {...register('platform')}>
                <option value='' disabled selected>
                  Selecione a plataforma
                </option>
                <option value='facebook'>Facebook</option>
                <option value='instagram'>Instagram</option>
                <option value='linkedin'>LinkedIn</option>
                <option value='twitter'>Twitter</option>
              </select>
            </div>
            <div>
              <label className={label()}>Assuntos:</label>
              <div className='space-y-2 mt-2'>
                {topics.map((topic) => (
                  <label key={topic.id} className='flex items-center'>
                    <input
                      type='checkbox'
                      className='mr-2'
                      {...register('topics')}
                      value={topic.name}
                    />
                    {topic.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            className={`mt-5 text-white p-3 rounded-md ${
              loading ? 'bg-gray-200 text-slate-500' : 'bg-purple-800'
            }`}
            disabled={loading}
          >
            {loading ? 'Gerando ideias...' : 'Gerar ideias'}
          </button>
        </form>
        {generatedPosts.length > 0 && (
          <>
            <h2 className='text-2xl font-bold mt-10 text-purple-800'>
              Ideias de posts geradas:
            </h2>
            <div className='grid md:grid-cols-2 gap-5 mt-5'>
              {generatedPosts.map((post, index) => (
                <div
                  key={index}
                  className='p-5 border border-gray-300 rounded-md'
                >
                  <h3 className='text-lg font-bold text-purple-900'>
                    {post.title}
                  </h3>
                  <p className='mt-3'>{post.content}</p>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {post.hashtags.map((tag, index) => (
                      <span key={index} className='text-purple-950 rounded-md'>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
