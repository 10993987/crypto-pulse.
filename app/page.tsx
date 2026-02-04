'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Coin } from './types/coin';
import { SkeletonCard } from './components/SkeletonCard';

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(''); // Состояние для поиска

useEffect(() => {

  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      setCoins(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка API:", error);
      setLoading(false);
    }
  };

  fetchData();

  const interval = setInterval(() => {
    fetchData();
    console.log("Данные обновлены");
  }, 30000);

  return () => clearInterval(interval);
}, []);

  const filteredCoins = coins.filter((coin) =>
  coin.name.toLowerCase().includes(search.toLowerCase()) ||
  coin.symbol.toLowerCase().includes(search.toLowerCase())
);

return (
  <main className="min-h-screen bg-[#0a0b0d] text-white p-8">
  <div className="max-w-4xl mx-auto">
    <header className="mb-10 text-center md:text-left md:flex md:justify-between md:items-end">
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
          Crypto-Pulse
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Мониторинг топ-10 активов в реальном времени</p>
      </div>
      
      <div className="mt-6 md:mt-0 relative">
        <input
          type="text"
          placeholder="Поиск монеты..."
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#16171a] border border-gray-800 text-sm rounded-xl py-3 px-5 w-full md:w-64 focus:outline-none focus:border-emerald-500 transition-all focus:ring-1 focus:ring-emerald-500/50"
        />
      </div>
    </header>

    {loading ? (
<div className="grid gap-3">
    {[...Array(5)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
    ) : (
      <div className="grid gap-3">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <div 
              key={coin.id} 
              className="group p-4 rounded-2xl bg-[#16171a] border border-gray-800 flex justify-between items-center hover:bg-[#1c1d21] hover:translate-x-1 transition-all cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                  <div className="absolute inset-0 rounded-full shadow-inner shadow-white/10"></div>
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight">{coin.name}</p>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{coin.symbol}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-mono text-lg font-bold">
                  ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold mt-1 ${
                  coin.price_change_percentage_24h > 0 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-[#16171a] rounded-2xl border border-dashed border-gray-800">
            <p className="text-gray-500">Монета "{search}" не найдена</p>
          </div>
        )}
      </div>
    )}
  </div>
</main>
)
}