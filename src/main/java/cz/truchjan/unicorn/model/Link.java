package cz.truchjan.unicorn.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "link")
public class Link {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "link_id")
	private Long id;

	@NonNull
	@Column(name = "name")
	private String name;

	@NonNull
	@Column(name = "url")
	private String url;

	@Column(name = "image")
	private String image;

	@Column(name = "description")
	private String description;

	@NonNull
	@Column(name = "available_firefox")
	private boolean availableFirefox;

	@NonNull
	@Column(name = "available_chrome")
	private boolean availableChrome;

	@NonNull
	@Column(name = "active")
	private boolean active;

	@NonNull
	@Column(name = "new_tab")
	private boolean newTab;

	@OneToMany(mappedBy = "link", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("link")
	private List<History> history = new ArrayList<>();
}
