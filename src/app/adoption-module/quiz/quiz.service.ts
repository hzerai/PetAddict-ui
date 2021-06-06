import { Injectable } from '@angular/core';
import { Quiz } from './quiz';



@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizzes: Quiz[] = [
    {
      question: 'What size garden do you have?',
      description: 'All pets need space to run and play, but dogs in particular need regular access to a safe and secure outdoor space. Many cats also enjoy being able to exercise outside and rabbits and guinea pigs need access to a large run or a garden to be happy and healthy.',
      answer: [

        { option: 'I have a small or medium size, secure garden', code: 'B' },
        { option: 'I have a big, secure garden', code: 'C' },
        { option: 'I don\'t have a secure garden', code: 'A' },
      ]
    },
    {
      question: 'How active are you?',
      description: 'Dogs enjoy regular walks, and playing off the lead whenever it\'s safe for them to do so. The amount of exercise a dog will need depends on their age, breed and health. All pets enjoy fun games and playing with toys to keep them active, but for smaller pets you can easily do this in your house.',
      answer: [
        { option: 'I spend lots of time outdoors and would enjoy playing with a pet but I prefer shorter walks', code: 'B' },
        { option: 'I\'m not very active and don\'t really spend much time outdoors', code: 'A' },
        { option: 'I love long walks all year round and I\'m not put off by bad weather and muddy paws!', code: 'C' }
      ]
    },
    {
      question: 'How much time do you have to spend with your pet?',
      description: 'Pets are generally sociable and dogs especially love your company. It\'s really important that they aren\'t left alone for longer than four hours, as dogs can become lonely, anxious and distressed. Walks, training, play time, feeding, cleaning their home and equipment (or cleaning up after your pet!) grooming and visits to the vet can start to add up and might take more time than you think.',
      answer: [
        { option: 'I\'m busy with little free time and I\'m out of the house for more than 4 hours most days', code: 'A' },
        { option: 'I have lots of free time to devote to my new pet', code: 'C' },
        { option: 'I\'m out of the house for most of the day but I have quite a lot of free time once I\'m home', code: 'B' },
      ]
    },
    {
      question: 'How much money could you spend on your new pet?',
      description: 'It\'s not just the initial cost of getting a pet which you need to consider. Food, equipment, toys, flea and worm treatments, pet insurance premiums, replacing a chewed-up bed or unexpected vets bills – it all adds up significantly over the lifetime of your pet, especially as they get older or if they develop health problems.',
      answer: [
        { option: 'I can afford £80-£125 every month - £1,500 plus a year', code: 'B' },
        { option: 'I can afford £125 or more every month - £2,000 plus a year', code: 'C' },
        { option: 'I can afford £20-£80 every month - £1,000 plus a year', code: 'A' },
      ]
    },
    {
      question: 'How much do you know about the pet that you want?',
      description: 'We\'re a nation of animal lovers, but the reality of owning a pet can be different from what we expect. Researching as much as you can about the species and breed of pet you want is really important, and real-life experiences of people who already own that pet and advice from a vet are essential. Make sure you know about The Animal Welfare Acts* and the five welfare needs that each pet needs to be healthy and happy.',
      answer: [
        { option: 'I don\'t know much about the pet I want and have never had a pet before', code: 'A' },
        { option: 'I\'ve done lots of research and have owned, or already own the pet I\'d like to get', code: 'C' },
        { option: 'I\'ve never owned the pet I\'d like before but I\'ve done lots of research', code: 'B' },
      ]
    }
  ]



  getQuizzes() {
    return this.quizzes;
  }
}