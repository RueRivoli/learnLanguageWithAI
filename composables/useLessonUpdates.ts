import type { Lesson } from "~/types/lessons/lesson";

export interface LessonUpdateEvent {
  type:
    | "quiz_completed"
    | "lesson_modified"
    | "score_updated"
    | "image_modified"
    | "custom";
  lessonId: string;
  data?: any;
  timestamp?: Date;
}

export const useLessonUpdates = () => {
  const eventBus = new EventTarget();
  const activeSubscriptions = new Map<
    string,
    Set<(event: LessonUpdateEvent) => void>
  >();

  /**
   * Subscribe to lesson update events for a specific lesson
   */
  const subscribeToLessonUpdates = (
    lessonId: string,
    callback: (event: LessonUpdateEvent) => void,
  ) => {
    if (!activeSubscriptions.has(lessonId)) {
      activeSubscriptions.set(lessonId, new Set());
    }

    const subscribers = activeSubscriptions.get(lessonId)!;
    subscribers.add(callback);

    // Return unsubscribe function
    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        activeSubscriptions.delete(lessonId);
      }
    };
  };

  /**
   * Emit a lesson update event
   */
  const emitLessonUpdate = (event: Omit<LessonUpdateEvent, "timestamp">) => {
    const fullEvent: LessonUpdateEvent = {
      ...event,
      timestamp: new Date(),
    };

    if (process.env.NODE_ENV === "development") {
      console.log("📤 Emitting lesson update event:", {
        type: fullEvent.type,
        lessonId: fullEvent.lessonId,
        subscriberCount: activeSubscriptions.get(event.lessonId)?.size || 0,
      });
    }

    // Notify specific lesson subscribers
    const subscribers = activeSubscriptions.get(event.lessonId);
    if (subscribers) {
      if (process.env.NODE_ENV === "development")
        console.log(
          `📋 Notifying ${subscribers.size} subscribers for lesson ${event.lessonId}`,
        );
      subscribers.forEach((callback) => {
        try {
          callback(fullEvent);
        } catch (error) {
          console.error("Error in lesson update callback:", error);
        }
      });
    } else {
      if (process.env.NODE_ENV === "development")
        console.log(`⚠️ No subscribers found for lesson ${event.lessonId}`);
    }

    // Also emit on global event bus for cross-component communication
    eventBus.dispatchEvent(
      new CustomEvent("lesson-update", { detail: fullEvent }),
    );
  };

  /**
   * Listen to global lesson update events
   */
  const onLessonUpdate = (callback: (event: LessonUpdateEvent) => void) => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<LessonUpdateEvent>;
      callback(customEvent.detail);
    };

    eventBus.addEventListener("lesson-update", handler);

    return () => {
      eventBus.removeEventListener("lesson-update", handler);
    };
  };

  /**
   * Utility functions for common lesson update scenarios
   */
  const notifyQuizCompleted = (
    lessonId: string,
    score: number,
    quizId: number,
  ) => {
    emitLessonUpdate({
      type: "quiz_completed",
      lessonId,
      data: { score, quizId },
    });
  };

  const notifyLessonModified = (lessonId: string, changes: Partial<Lesson>) => {
    emitLessonUpdate({
      type: "lesson_modified",
      lessonId,
      data: changes,
    });
  };
  const notifyImageAdded = (lessonId: string, changes: Partial<Lesson>) => {
    if (process.env.NODE_ENV === "development")
      console.log("🚀 notifyImageAdded called:", { lessonId, changes });
    emitLessonUpdate({
      type: "image_modified",
      lessonId,
      data: changes,
    });
  };

  const notifyScoreUpdated = (lessonId: string, newScore: number) => {
    emitLessonUpdate({
      type: "score_updated",
      lessonId,
      data: { score: newScore },
    });
  };

  return {
    emitLessonUpdate,
    onLessonUpdate,
    notifyImageAdded,
    notifyQuizCompleted,
    notifyLessonModified,
    notifyScoreUpdated,
    subscribeToLessonUpdates,
  };
};

// Global instance for the app
export const lessonUpdateBus = useLessonUpdates();
