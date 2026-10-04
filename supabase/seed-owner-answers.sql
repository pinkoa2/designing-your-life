-- Optional: load the original check-in answers (from answers.json) into one account.
-- Run AFTER that person has been invited. Replace YOUR_EMAIL with their sign-in email.

insert into public.answers (user_id, area, score, note)
select u.id, v.area, v.score, v.note
from auth.users u
cross join (values
  ('health', 80, 'Physically I''m in good shape: the gym 3–4 times a week and a 4–5 mile run at least once a week. I''m not as strong or fast as I used to be, and I''d like to be a bit leaner, but training is a big part of my life and I enjoy it. My mental health is what keeps this from 100. It''s okay, not great, and I''m working on it, partly through this book and fun projects like this site.'),
  ('work', 20, 'My work right now is a 9–5 software engineering job that no longer fulfills me or brings me joy. It burns me out so much that I have little left for anything outside it. I''d love a more interesting job, or something on the side that brings in income. I think about it a lot: a new job, second income streams. But I feel trapped by my own inaction.'),
  ('play', 40, 'A lot of my free time goes to scrolling YouTube and Instagram, though I do enjoy sitting down with a video or a show. What I really love is reading every night: fantasy, classics, and I''d like to get into philosophy. Beyond that I don''t have much fun. I enjoy peace and quiet, being outdoors, and traveling, but I rarely do them. Fun isn''t a core value for me, and not having much of it doesn''t make me unhappy. Hence the low score.'),
  ('love', 70, 'My girlfriend is the main reason this score is high. She''s always there for me and makes my life sweeter, and I love hanging out with her doing literally anything. I''m close with my family too, and I feel love both given and received. Friendships are where I can do better: I rarely see a lot of my close friends, and I don''t make enough effort in general. I get on well with my co-workers, and as an introvert who needs time alone, my social life genuinely feels like enough.')
) as v(area, score, note)
where u.email = 'YOUR_EMAIL'
on conflict (user_id, exercise, area) do update
  set score = excluded.score, note = excluded.note, updated_at = now();
