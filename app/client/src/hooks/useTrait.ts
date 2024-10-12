/*
  Этот хук позволяет получать данные useState синхронно, предоставляя методы get и set для управления состоянием.  
*/

import { useState } from "react";

// Функция useTrait возвращает объект с двумя методами: get и set, для управления значением состояния
export default function useTrait<T>(initialValue: T) {
  // Создаем состояние с помощью хука useState и передаем начальное значение
  const [trait, updateTrait] = useState<T>(initialValue);

  // Создаем переменную current и присваиваем ей текущее значение состояния
  let current: T = trait;

  // Функция get возвращает текущее значение состояния
  const get = () => current;

  // Функция set обновляет текущее значение состояния и возвращает его
  const set = (newValue: T) => {
    current = newValue;
    // Обновляем состояние с помощью функции updateTrait
    updateTrait(newValue);
    // Возвращаем текущее значение состояния
    return current;
  };

  // Возвращаем объект с методами get и set для управления состоянием
  return {
    get,
    set,
  };
}
