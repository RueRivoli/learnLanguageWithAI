# Lesson Data Refetching Best Practices

This guide explains how to implement automatic lesson data refetching when changes occur in the application.

## Overview

The lesson data fetching system has been refactored to use Nuxt 3 best practices with automatic refetching capabilities. Here's what was implemented:

### Key Components

1. **`useLesson` composable** - Handles lesson data fetching with reactive updates
2. **`useLessonUpdates` composable** - Manages lesson update events and notifications
3. **Automatic refetching** - Lessons automatically refresh when changes occur

## Usage

### Basic Lesson Fetching

```typescript
// In a Vue component
const {
  lesson,
  grammarRule,
  relatedQuiz,
  isLoading,
  error,
  refresh
} = useLesson(lessonId);
```

### Automatic Refetching

The system automatically refetches lesson data when:

- Quiz is completed
- Lesson is modified
- Score is updated
- Lesson ID changes (route navigation)

### Manual Refetching

```typescript
// Refresh lesson data manually
await refresh();
```

### Notifying About Changes

```typescript
import { lessonUpdateBus } from "~/composables/useLessonUpdates";

// Notify when quiz is completed
lessonUpdateBus.notifyQuizCompleted(lessonId, score, quizId);

// Notify when lesson is modified
lessonUpdateBus.notifyLessonModified(lessonId, { quizId: newQuizId });

// Notify when score is updated
lessonUpdateBus.notifyScoreUpdated(lessonId, newScore);

// Notify when image is added
lessonUpdateBus.notifyImageAdded(lessonId, newScore);
```

## Implementation Details

### useLesson Composable

- Uses `useAsyncData` for server-side rendering and client-side hydration
- Automatically refetches when lesson ID changes
- Handles grammar rule fetching automatically
- Provides computed properties for sentences and image URLs
- Includes proper error handling and loading states

### useLessonUpdates Composable

- Event-driven system for lesson updates
- Supports both specific lesson subscriptions and global events
- Provides utility functions for common update scenarios
- Automatically cleans up subscriptions on component unmount

## Best Practices

### 1. Always Use the Composable

Instead of manual `useFetch` calls, use the `useLesson` composable:

```typescript
// ✅ Good
const { lesson, isLoading, refresh } = useLesson(lessonId);

// ❌ Avoid
const { data: lesson } = await useFetch(`/api/lessons/${lessonId}`);
```

### 2. Notify About Changes

When you modify lesson-related data, notify the system:

```typescript
// After quiz completion
lessonUpdateBus.notifyQuizCompleted(lessonId, score, quizId);

// After lesson modification
lessonUpdateBus.notifyLessonModified(lessonId, changes);
```

### 3. Handle Loading States

The composable provides proper loading states:

```vue
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else-if="isReady">
    <!-- Lesson content -->
  </div>
</template>
```

### 4. Use Computed Properties

The composable provides useful computed properties:

```typescript
// Use provided computed properties
const { sentences, imageUrl } = useLesson(lessonId);

// Instead of creating your own
const sentences = computed(() => {
  // Manual computation...
});
```

## Migration Guide

### From Old Implementation

1. Replace manual `useFetch` calls with `useLesson` composable
2. Remove manual grammar rule fetching (handled automatically)
3. Use provided computed properties instead of creating your own
4. Add update notifications when modifying lesson data

### Example Migration

```typescript
// Before
const getLesson = async () => {
  const { data, error } = await useFetch(`/api/lessons/${lessonId}`);
  // Manual data transformation...
  lesson.value = transformedData;
  await getGrammarRule();
};

// After
const { lesson, grammarRule, refresh } = useLesson(lessonId);
// Everything is handled automatically!
```

## Error Handling

The system includes comprehensive error handling:

- Network errors are caught and displayed
- Invalid lesson IDs are handled gracefully
- Grammar rule fetching errors don't break lesson loading
- Loading states are properly managed

## Performance Considerations

- Lessons are cached and only refetched when necessary
- Grammar rules are fetched only when lesson data is available
- Event subscriptions are automatically cleaned up
- Server-side rendering is supported for better performance

## Testing

To test the refetching system:

1. Open a lesson page
2. Complete a quiz or modify lesson data
3. Verify that the lesson data automatically updates
4. Check browser network tab for refetch requests

## Troubleshooting

### Lesson Not Refreshing

1. Check if you're using the `useLesson` composable
2. Verify that update notifications are being sent
3. Check browser console for error messages

### Performance Issues

1. Ensure subscriptions are being cleaned up
2. Check for unnecessary refetches
3. Verify that caching is working properly

### SSR Issues

1. Ensure server-side rendering is enabled in `useAsyncData`
2. Check that data transformation works on both client and server
3. Verify that hydration doesn't cause issues
