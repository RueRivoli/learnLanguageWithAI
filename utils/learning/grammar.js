"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelLabel = getLevelLabel;
exports.getGrammarRuleInitialLetters = getGrammarRuleInitialLetters;
exports.getGrammarRuleStyleClass = getGrammarRuleStyleClass;
exports.getProgressBarStyleClass = getProgressBarStyleClass;
exports.getPercentageStyleClass = getPercentageStyleClass;
var vue_1 = require("vue");
function getLevelLabel(level) {
    switch (level) {
        case 1 /* RuleDifficulty.BEGINNER */:
            return (0, vue_1.h)("div", { class: "flex items-center" }, [
                (0, vue_1.h)("div", { class: "status status-success mr-2" }),
                (0, vue_1.h)("div", "beginner"),
            ]);
        case 2 /* RuleDifficulty.INTERMEDIATE */:
            return (0, vue_1.h)("div", { class: "flex items-center" }, [
                (0, vue_1.h)("div", { class: "status status-warning mr-2" }),
                (0, vue_1.h)("div", "intermediate"),
            ]);
        case 3 /* RuleDifficulty.ADVANCED */:
            return (0, vue_1.h)("div", { class: "flex items-center" }, [
                (0, vue_1.h)("div", { class: "status status-error mr-2" }),
                (0, vue_1.h)("div", "advanced"),
            ]);
        case 4 /* RuleDifficulty.EXPERT */:
            return (0, vue_1.h)("div", { class: "flex items-center" }, [
                (0, vue_1.h)("div", { class: "status status-success mr-2" }),
                (0, vue_1.h)("div", "expert"),
            ]);
        default:
            return (0, vue_1.h)("div", { class: "flex items-center" }, [
                (0, vue_1.h)("div", { class: "status status-neutral mr-2" }),
                (0, vue_1.h)("div", "unkown"),
            ]);
    }
}
function getGrammarRuleInitialLetters(level) {
    var words = level.split(" ");
    var initials = "";
    var i = 0;
    while (i < 3 && words[i]) {
        initials += words[i].charAt(0).toUpperCase();
        i += 1;
    }
    return initials;
}
function getGrammarRuleStyleClass(rule) {
    // TODO: find better styling idea
    switch (rule.difficulty_class) {
        case 1 /* RuleDifficulty.BEGINNER */:
            return "bg-success";
        case 2 /* RuleDifficulty.INTERMEDIATE */:
            return "bg-warning";
        case 3 /* RuleDifficulty.ADVANCED */:
            return "bg-error";
        case 4 /* RuleDifficulty.EXPERT */:
            return "bg-neutral";
        default:
            return "bg-neutral";
    }
}
function getProgressBarStyleClass(progress) {
    if (progress < 30) {
        return "progress-error";
    }
    else if (progress < 50) {
        return "progress-warning";
    }
    else if (progress < 70) {
        return "progress-neutral";
    }
    else if (progress < 100) {
        return "progress-accent";
    }
    else if (progress === 100) {
        return "progress-success";
    }
    else {
        return "progress-neutral";
    }
}
function getPercentageStyleClass(progress) {
    if (progress < 30) {
        return "text-error";
    }
    else if (progress < 50) {
        return "text-warning";
    }
    else if (progress < 70) {
        return "text-neutral";
    }
    else if (progress < 100) {
        return "text-accent";
    }
    else if (progress === 100) {
        return "text-success";
    }
    else {
        return "text-neutral";
    }
}
