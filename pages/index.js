import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [question, setQuestion] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ birthday, gender, question })
    });
    const data = await res.json();
    localStorage.setItem('gpt_reply', data.reply);
    router.push('/result');
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>AI东方命理简批</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="出生日期：2002-04-04" onChange={e => setBirthday(e.target.value)} required /><br /><br />
        <input placeholder="性别：男 / 女" onChange={e => setGender(e.target.value)} required /><br /><br />
        <input placeholder="你想问什么？（可选）" onChange={e => setQuestion(e.target.value)} /><br /><br />
        <button type="submit">生成命理报告</button>
      </form>
    </div>
  );
}
