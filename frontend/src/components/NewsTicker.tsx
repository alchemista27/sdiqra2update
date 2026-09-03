"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { postsApi } from "@/lib/api";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export default function NewsTicker() {
  const [newsList, setNewsList] = useState<{ id: string; title: string; slug: string }[]>([]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [locationName, setLocationName] = useState<string>("Bengkulu");
  const [loadingPrayer, setLoadingPrayer] = useState<boolean>(true);
  const [showTicker, setShowTicker] = useState<boolean>(true);

  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [activePrayerIndex, setActivePrayerIndex] = useState(0);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
   
    const observer = new IntersectionObserver(
      ([entry]) => setShowTicker(!entry.isIntersecting),
      { threshold: 0.1 }
    );
   
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await postsApi.getAll({ limit: "5", status: "PUBLISHED" });
        if (res?.data) setNewsList(res.data);
      } catch (error: any) {
        console.warn("Info: Tidak dapat mengambil data berita.");
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const defaultLat = -3.8004;
    const defaultLng = 102.2562;

    const fetchPrayerTimes = async (lat: number, lng: number) => {
      try {
        setLoadingPrayer(true);
        const date = new Date();
        const apiStr = `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${lat}&longitude=${lng}&method=11`;
       
        const response = await fetch(apiStr);
        const data = await response.json();
       
        if (data?.data?.timings) {
          setPrayerTimes({
            Fajr: data.data.timings.Fajr,
            Dhuhr: data.data.timings.Dhuhr,
            Asr: data.data.timings.Asr,
            Maghrib: data.data.timings.Maghrib,
            Isha: data.data.timings.Isha,
          });
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setLoadingPrayer(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationName("Lokasi Anda");
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setLocationName("Bengkulu");
          fetchPrayerTimes(defaultLat, defaultLng);
        },
        { timeout: 10000 }
      );
    } else {
      setLocationName("Bengkulu");
      fetchPrayerTimes(defaultLat, defaultLng);
    }
  }, []);

  useEffect(() => {
    if (newsList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % newsList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [newsList.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePrayerIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getNextPrayer = () => {
    if (!prayerTimes) return null;
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const parseTime = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };

    const schedule = [
      { name: 'Subuh', time: parseTime(prayerTimes.Fajr), display: prayerTimes.Fajr },
      { name: 'Dzuhur', time: parseTime(prayerTimes.Dhuhr), display: prayerTimes.Dhuhr },
      { name: 'Ashar', time: parseTime(prayerTimes.Asr), display: prayerTimes.Asr },
      { name: 'Maghrib', time: parseTime(prayerTimes.Maghrib), display: prayerTimes.Maghrib },
      { name: 'Isya', time: parseTime(prayerTimes.Isha), display: prayerTimes.Isha },
    ];

    for (let i = 0; i < schedule.length; i++) {
        if (currentTime < schedule[i].time) return schedule[i];
    }
    return { name: 'Subuh', time: parseTime(prayerTimes.Fajr), display: prayerTimes.Fajr, isTomorrow: true };
  };

  const nextPrayer = getNextPrayer();

  const prayersList = prayerTimes ? [
    { name: 'Subuh', time: prayerTimes.Fajr, isNext: nextPrayer?.name === 'Subuh' },
    { name: 'Dzuhur', time: prayerTimes.Dhuhr, isNext: nextPrayer?.name === 'Dzuhur' },
    { name: 'Ashar', time: prayerTimes.Asr, isNext: nextPrayer?.name === 'Ashar' },
    { name: 'Maghrib', time: prayerTimes.Maghrib, isNext: nextPrayer?.name === 'Maghrib' },
    { name: 'Isya', time: prayerTimes.Isha, isNext: nextPrayer?.name === 'Isya' },
  ] : [];

  return (
    <div className={`fixed bottom-0 left-0 w-full z-[9999] bg-tertiary text-on-tertiary shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ${showTicker ? 'translate-y-0' : 'translate-y-full'}`}>
      
      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex h-10 w-full">
          {/* Left: News Marquee */}
          <div className="flex-1 flex items-center overflow-hidden border-r border-surface/10">
          <div className="bg-secondary text-primary px-4 py-2 h-full flex items-center justify-center font-bold text-xs whitespace-nowrap z-10 uppercase tracking-wider shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[18px] mr-1">campaign</span>
            Info
          </div>
          <div className="flex-1 overflow-hidden relative h-full flex items-center">
              {newsList.length > 0 ? (
                  <div className="animate-marquee hover:[animation-play-state:paused] whitespace-nowrap flex items-center gap-10 absolute left-0 pr-10">
                      {newsList.map((news, idx) => (
                      <Link key={idx} href={`/berita/${news.slug}`} className="hover:text-secondary transition-colors flex items-center text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-secondary mr-3 inline-block shadow-sm"></span>
                          {news.title}
                      </Link>
                      ))}
                      {newsList.map((news, idx) => (
                      <Link key={`dup-${idx}`} href={`/berita/${news.slug}`} className="hover:text-secondary transition-colors flex items-center text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-secondary mr-3 inline-block shadow-sm"></span>
                          {news.title}
                      </Link>
                      ))}
                  </div>
              ) : (
                  <span className="text-on-tertiary/50 text-xs ml-6 italic">Memuat berita terbaru...</span>
              )}
          </div>
        </div>
        
        {/* Right: Prayer Times */}
        <div className="shrink-0 pl-4 pr-10 flex items-center justify-end gap-5">
          <div className="flex items-center text-on-tertiary/90 shrink-0 pl-1">
            <span className="material-symbols-outlined text-[16px] mr-1">location_on</span>
            <span className="font-medium text-xs tracking-wide">{locationName}</span>
          </div>
          <div className="w-px h-4 bg-surface/20 mx-1 shrink-0"></div>
          {loadingPrayer ? (
            <span className="text-on-tertiary/50 italic px-2 text-xs">Memuat jadwal...</span>
          ) : prayerTimes ? (
            <div className="flex items-center gap-4">
              {prayersList.map((p) => (
                <PrayerTimeBlock key={p.name} name={p.name} time={p.time} isNext={p.isNext} />
              ))}
            </div>
          ) : (
            <span className="text-red-300 text-xs">Gagal memuat jadwal</span>
          )}
        </div>
      </div>

      {/* MOBILE LAYOUT (Flipped Card) */}
      <div className="flex md:hidden h-10 w-full divide-x divide-surface/20 text-xs">
        {/* Left: News */}
        <div className="flex-1 flex items-center overflow-hidden relative px-3">
          <span className="font-bold text-[#FBBF24] mr-2 shrink-0 uppercase tracking-wider text-[10px]">Info</span>
          <div className="flex-1 relative h-full">
            {newsList.length > 0 ? (
              newsList.map((news, idx) => {
                let transformClass = 'opacity-0 translate-y-4'; // default waiting below
                if (idx === activeNewsIndex) transformClass = 'opacity-100 translate-y-0';
                else if (idx === (activeNewsIndex - 1 + newsList.length) % newsList.length) transformClass = 'opacity-0 -translate-y-4'; // exited above
                
                return (
                  <div key={idx} className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out pointer-events-none ${transformClass}`}>
                    <Link href={`/berita/${news.slug}`} className="truncate w-full hover:text-secondary pointer-events-auto">
                      {news.title}
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="absolute inset-0 flex items-center">
                <span className="text-on-tertiary/50 italic">Memuat berita...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Prayer */}
        <div className="w-[120px] shrink-0 flex items-center justify-center relative overflow-hidden bg-surface/5">
          {loadingPrayer ? (
            <span className="text-on-tertiary/50 italic">Jadwal...</span>
          ) : prayerTimes ? (
            prayersList.map((prayer, idx) => {
              let transformClass = 'opacity-0 translate-y-4';
              if (idx === activePrayerIndex) transformClass = 'opacity-100 translate-y-0';
              else if (idx === (activePrayerIndex - 1 + 5) % 5) transformClass = 'opacity-0 -translate-y-4';
              
              return (
                <div key={idx} className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ease-in-out ${transformClass}`}>
                  <span className={`font-bold tracking-wide uppercase text-[10px] ${prayer.isNext ? 'text-[#FBBF24]' : 'text-on-tertiary/80'}`}>{prayer.name}</span>
                  <span className={`font-medium ${prayer.isNext ? 'text-[#FBBF24]' : ''}`}>{prayer.time}</span>
                  {prayer.isNext && <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse absolute right-2" />}
                </div>
              );
            })
          ) : (
            <span className="text-red-300">Gagal</span>
          )}
        </div>
      </div>
    </div>
  );
}

function PrayerTimeBlock({ name, time, isNext }: { name: string; time: string; isNext: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 shrink-0 transition-colors ${isNext ? 'text-[#FBBF24]' : 'text-on-tertiary'}`}>
      <span className={`text-[10px] uppercase font-bold tracking-wider ${isNext ? 'text-[#FBBF24]' : 'text-on-tertiary/80'}`}>{name}</span>
      <span className={`text-sm ${isNext ? 'font-bold' : 'font-medium'}`}>{time}</span>
      {isNext && <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse ml-0.5 shadow-sm" />}
    </div>
  );
}
