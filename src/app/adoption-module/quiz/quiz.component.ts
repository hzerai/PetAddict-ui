import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('answer', [
      transition('void => *', [style({ opacity: 0, transform: 'translateY(-3rem)' }), animate(300)])
    ])
  ]
})
export class QuizComponent implements OnInit {
  quizzes = [];
  currentQuiz: number;
  answerSelected = false;
  codes = '';
  resultAnimal = '';
  prevAnswered = [];

  result = false;
  resultStatus = 'Show my pet';


  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
    this.currentQuiz = this.getRandom();

    this.prevAnswered.push(this.currentQuiz);
  }


  onAnswer(code: string) {
    this.answerSelected = true;
    setTimeout(() => {
      let newQuiz = this.getRandom();
      while (this.prevAnswered.includes(newQuiz) && this.prevAnswered.length < 5) {
        newQuiz = this.getRandom();
      }
      this.currentQuiz = newQuiz;
      this.prevAnswered.push(this.currentQuiz);

      this.answerSelected = false;
    }, 1000);

    this.codes += code;

  }

  getRandom() {
    return Math.floor(Math.random() * this.quizzes.length);
  }

  showResult() {
    let dog = this.codes.match(new RegExp('C', 'g'))?.length;
    let cat = this.codes.match(new RegExp('B', 'g'))?.length;
    let bird = this.codes.match(new RegExp('A', 'g'))?.length;
    dog = dog == undefined ? 0 : dog;
    cat = cat == undefined ? 0 : cat;
    bird = bird == undefined ? 0 : bird;
    if (dog > cat && dog > bird) {
      this.resultAnimal = 'YOU NEED A DOG';
    } else if (cat > dog && cat > bird) {
      this.resultAnimal = 'YOU NEED A CAT';
    } else if (bird > dog && bird > cat) {
      this.resultAnimal = 'YOU NEED A BIRD';
    } else if (dog == cat) {
      this.resultAnimal = 'YOU NEED A DOG or A CAT';
    } else if (cat == bird) {
      this.resultAnimal = 'YOU NEED A BIRD or A CAT';
    }
    this.result = true;
    this.resultStatus = 'Try Again!';
  }
  playAgain() {
    this.prevAnswered = [];
    this.prevAnswered.push(this.getRandom());
    this.codes = '';
    this.resultAnimal = '';
    this.result = false;
    this.resultStatus = 'Show my pet';
  }
}
