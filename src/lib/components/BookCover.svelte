<!-- The book's published cover (Alfred A. Knopf, 2016), shown as an object on the
     wall: a soft spine fold on the left and the same shadow as the rack. -->
<figure class="book">
  <img
    src="/images/designing-your-life-cover.jpg"
    width="352"
    height="500"
    alt="Cover of Designing Your Life: How to Build a Well-Lived, Joyful Life, by Bill Burnett and Dave Evans"
  />
</figure>

<style>
  .book {
    position: relative;
    width: 100%;
    max-width: 352px;
    margin: 0;
    border-radius: 2px 6px 6px 2px;
    overflow: hidden;
    box-shadow:
      0 1px 2px rgb(27 26 34 / 0.1),
      0 24px 48px -20px rgb(27 26 34 / 0.45);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* The spine: a soft fold along the left edge. */
  .book::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 6%;
    background: linear-gradient(90deg, rgb(27 26 34 / 0.22), rgb(27 26 34 / 0.04) 60%, transparent);
  }
</style>
